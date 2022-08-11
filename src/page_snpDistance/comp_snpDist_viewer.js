import { Col, Empty, Row } from "antd";
import * as d3Select from "d3-selection";
import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import isShowingLoadingModalToStore from "../action/isShowingLoadingModalActions.js";
import {
  dist_changeChartSession,
  dist_changeIsUserDraw,
  dist_changeIsUserExport,
  dist_changeIsUserLoadSession,
} from "../action/snpdistSettingsActions";
import GraphEdgeList from "../model/graphEdgeList_prop";
import { createSNPdistCSVFile } from "../utils/create_exportFile";
import { downloadSVG, vh, vw } from "../utils/utils";
import { createBarPlot_all, createChart } from "./chart_barplot_all";
import "./style_snpdist.css";

const SNPdistViewer = (props) => {
  //Ref
  const chartContainerRef = useRef();
  const snpdistSVGRef = useRef();

  //Drawing constructor
  const dim_w = vw(100) - 200 - 20; //200 is sider width, 20 is just a nice margin
  const dim_h = vh(100) - 120 - 20;
  const margin = { top: 20, right: 20, bottom: 40, left: 60 };
  const chartArea_width = dim_w - margin.left - margin.right;
  const chartArea_height = dim_h - margin.top - margin.bottom;

  //States
  //state
  const [chartIsDisplayed, setChartIsDisplayed] = useState(false);

  const metadata_arr = props.metadata
    ? Array.from(props.metadata.values())
    : null;

  //Settings
  const dataToDisplay = props.snpDistSettings.dataToDisplay;
  const dataColumn = props.snpDistSettings.dataColumn;
  const dataColumnLevel = props.snpDistSettings.dataColumnLevel;
  const snpDistExportFormat = props.snpDistSettings.snpDistExportFormat;
  const isUserDrawChart = props.snpDistSettings.isUserDrawChart;
  const isUserExportSnpDist = props.snpDistSettings.isUserExportSnpDist;
  const prevSessionData = props.snpDistSettings.chartSession;
  const isUserReloadSession = props.snpDistSettings.isUserReloadSession;

  //Automatic reload if we have previous session
  if (prevSessionData) {
    //check the method dataColumnLevel: intra_inter_group
    setTimeout(() => {
      redraw();
      setChartIsDisplayed(true);
    }, 10);
  }

  //UseEffect
  useEffect(() => {
    if (isUserDrawChart) {
      props.isShowingLoadingModalToStore(true);
      setTimeout(() => {
        draw();
        setChartIsDisplayed(true);
        props.dist_changeIsUserDraw(false);
        props.isShowingLoadingModalToStore(false);
      }, 10);
    }
  }, [isUserDrawChart]);

  useEffect(() => {
    if (isUserReloadSession) {
      setTimeout(() => {
        redraw();
        setChartIsDisplayed(true);
        props.dist_changeIsUserLoadSession(false);
      }, 10);
    }
  }, [isUserReloadSession]);

  useEffect(() => {
    if (isUserExportSnpDist) {
      switch (snpDistExportFormat) {
        case "symSnpDist":
          //prepare data
          let edgeList = [];
          let nodeList = [];
          props.hammingMatrix.forEach((v, k) => {
            nodeList.push(k);
            edgeList = edgeList.concat(v);
          });
          let snp_dist = new GraphEdgeList(
            nodeList,
            edgeList
          ).getSymetricEdges().edges;
          createSNPdistCSVFile(snp_dist);
          props.dist_changeIsUserExport(false);
          break;

        case "barChartSvg":
          downloadSVG("snpdist-chart-svg");
          break;

        default:
          break;
      }
    }
  }, [snpDistExportFormat, isUserExportSnpDist]);

  //Functions
  const reloadChartHandler = (val) => {
    if (!isUserReloadSession) {
      props.dist_changeIsUserLoadSession(true);
    }
  };

  function getIsolatesByDataColumnAndLevel(meta_arr, dataCol, dataColLevel) {
    let filteredRec = meta_arr.filter((rec) => {
      if (rec[dataCol] === dataColLevel) {
        return true;
      } else {
        return false;
      }
    });
    let res = filteredRec.map((d) => d.sample_id);
    return res;
  }

  //DRAWING
  function draw() {
    // console.log("draw", +new Date());
    //clean previous drawing artifacts
    d3Select.select("#snpdist_svgGroup").remove();

    //prepare data
    let edgeList = [];
    let nodeList = [];

    // console.log("edgeList_construction", +new Date());

    props.hammingMatrix.forEach((v, k) => {
      nodeList.push(k);
      edgeList = edgeList.concat(v);
    });

    // console.log("chart_data_construction", +new Date());
    let chart_data = new GraphEdgeList(nodeList, edgeList).getSymetricEdges()
      .edges;

    if (dataToDisplay === "all") {
      // console.log("data_list_construction", +new Date());
      let data_list = chart_data.map((d) => d.value);

      const svg = d3Select.select(snpdistSVGRef.current);
      createBarPlot_all(
        "All samples",
        null,
        svg,
        data_list,
        chartArea_width,
        chartArea_height,
        margin,
        props.dist_changeChartSession
      );
    } else {
      let filtered_chart_data = null;
      // When column level is artificially intra or inter group
      if (
        dataColumnLevel === "INTRA-Group" ||
        dataColumnLevel === "INTER-Group"
      ) {
        let nonGroup_ColLevel = [
          null,
          "NA",
          "N/A",
          "#N/A",
          "#NA",
          "",
          false,
          "false",
          "nil",
          "null",
          undefined,
        ];

        let groupLUT = new Map();
        metadata_arr.forEach((d) => {
          if (nonGroup_ColLevel.indexOf(d[dataColumn]) === -1) {
            //console.log(d[dataColumn]);
            groupLUT.set(d.sample_id, d[dataColumn]);
          }
        });
        //When intra
        if (dataColumnLevel === "INTRA-Group") {
          filtered_chart_data = chart_data.filter((d) => {
            if (groupLUT.get(d.source) === groupLUT.get(d.target)) {
              return true;
            } else {
              return false;
            }
          });
        }
        //When inter
        else {
          filtered_chart_data = chart_data.filter((d) => {
            if (groupLUT.get(d.source) !== groupLUT.get(d.target)) {
              return true;
            } else {
              return false;
            }
          });
        }
      } else {
        // When colum level is the actual level
        let includedIsolates = getIsolatesByDataColumnAndLevel(
          metadata_arr,
          dataColumn,
          dataColumnLevel
        );

        filtered_chart_data = chart_data.filter((d) => {
          if (
            includedIsolates.indexOf(d.source) !== -1 &&
            includedIsolates.indexOf(d.target) !== -1
          ) {
            return true;
          } else {
            return false;
          }
        });
      }

      let data_list = filtered_chart_data
        ? filtered_chart_data.map((d) => d.value)
        : [];
      const svg = d3Select.select(snpdistSVGRef.current);
      createBarPlot_all(
        dataColumn,
        dataColumnLevel,
        svg,
        data_list,
        chartArea_width,
        chartArea_height,
        margin,
        props.dist_changeChartSession
      );
    }

    //set svg attributes

    // if (dataToDisplay === "all") {
    //   // draw a violin + jitter + boxplot for all, color coded by selected column
    // } else {
    //   //draw charts based on factors from the column
    // }
  }

  //RE-DRAWING
  function redraw() {
    //clean previous drawing artifacts
    d3Select.select("#snpdist_svgGroup").remove();
    const svg = d3Select.select(snpdistSVGRef.current);
    createChart(svg, prevSessionData);
  }

  return (
    <Row>
      <Col span={24}>
        <div id="snpdist-cont-is-empty" style={{ display: "block" }}>
          <Empty
            style={{ display: chartIsDisplayed ? "none" : "block" }}
            description={
              prevSessionData
                ? "Reload previous chart"
                : "No chart, create one "
            }
            image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
        </div>
      </Col>
      <Col ref={chartContainerRef} sm={24}>
        <div
          id="snpdist-chart-container"
          style={{ height: "100%", width: "100%" }}>
          <svg id="snpdist-chart-svg" ref={snpdistSVGRef}></svg>
        </div>
      </Col>
    </Row>
  );
};

function mapStateToProps(state) {
  return {
    snpDistSettings: state.snpDistSettings,
    hammingMatrix: state.hammMatrix,
    metadata: state.metadata,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      dist_changeIsUserDraw,
      dist_changeIsUserExport,
      dist_changeChartSession,
      dist_changeIsUserLoadSession,
      isShowingLoadingModalToStore,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SNPdistViewer);

/*
<Button onClick={reloadChartHandler} type="primary">
              Reload
            </Button>
*/
