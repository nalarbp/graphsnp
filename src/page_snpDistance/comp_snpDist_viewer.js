import React, { useEffect, useRef } from "react";
import { Row, Col } from "antd";
import "./style_snpDist.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  dist_changeIsUserDraw,
  dist_changeIsUserExport,
} from "../action/snpdistSettingsActions";
import * as d3Select from "d3-selection";
//import useResizeObserver from "../hooks/hook_resizeObserver"; //Broken
import GraphEdgeList from "../model/graphEdgeList_prop";
import { vh, vw } from "../utils/utils";
import { createBoxplot } from "./chart_boxplot_all";

const _ = require("lodash");

const SNPdistViewer = (props) => {
  //Ref
  const chartContainerRef = useRef();
  const snpdistSVGRef = useRef();

  //Drawing constructor
  const dim_w = vw(100) - 200 - 20; //200 is sider width, 20 is just a nice margin
  const dim_h = vh(100) - 120 - 20;
  const margin = { top: 30, right: 30, bottom: 30, left: 30 };
  const chartArea_width = dim_w - margin.left - margin.right;
  const chartArea_height = dim_h - margin.top - margin.bottom;

  //States

  //Settings
  const dataToDisplay = props.snpDistSettings.dataToDisplay;
  const dataColumn = props.snpDistSettings.dataColumn;
  const chartOrientation = props.snpDistSettings.chartOrientation;
  const snpDistExportFormat = props.snpDistSettings.snpDistExportFormat;
  const isUserDrawChart = props.snpDistSettings.isUserDrawChart;
  const isUserExportSnpDist = props.snpDistSettings.isUserExportSnpDist;

  //UseEffect
  useEffect(() => {
    if (isUserDrawChart) {
      setTimeout(() => {
        draw();
        props.dist_changeIsUserDraw(false);
      }, 10);
    }
  }, [isUserDrawChart]);

  //DRAWING
  function draw() {
    //clean previous drawing artifacts
    d3Select.select("#snpdist_svgGroup").remove();

    //prepare data
    let edgeList = [];
    let nodeList = [];
    props.hammingMatrix.forEach((v, k) => {
      nodeList.push(k);
      edgeList = edgeList.concat(v);
    });
    let chart_data = new GraphEdgeList(nodeList, edgeList).getSymetricEdges()
      .edges;
    if (dataToDisplay === "all") {
      const data_list = chart_data.map((d) => d.value);
      const svg = d3Select.select(snpdistSVGRef.current);
      createBoxplot(
        svg,
        data_list,
        chartArea_width,
        chartArea_height,
        margin,
        chartOrientation,
        null,
        null
      );
    } else {
    }

    //set svg attributes

    // if (dataToDisplay === "all") {
    //   // draw a violin + jitter + boxplot for all, color coded by selected column
    // } else {
    //   //draw charts based on factors from the column
    // }
  }

  return (
    <Row>
      <Col ref={chartContainerRef} sm={24}>
        <div
          id="snpdist-chart-container"
          style={{ height: "100%", width: "100%" }}
        >
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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      dist_changeIsUserDraw,
      dist_changeIsUserExport,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SNPdistViewer);
