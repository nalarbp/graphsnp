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
import * as d3Scale from "d3-scale";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";

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
    console.log(chart_data.length);

    const data_list = chart_data.map((d) => d.value);
    const data_stats = {
      min: d3Array.min(data_list),
      q1: d3Array.quantile(data_list, 0.25),
      median: d3Array.median(data_list),
      mean: d3Array.mean(data_list),
      q3: d3Array.quantile(data_list, 0.75),
      max: d3Array.max(data_list),
    };
    const scale_v = d3Scale.scaleLinear().range([chartArea_height, 0]); // bottom to top

    const scale_h = d3Scale.scaleLinear().range([0, chartArea_width]); //left to right

    const svg = d3Select.select(snpdistSVGRef.current);
    //set svg attributes

    svg
      .attr("width", chartArea_width + margin.left + margin.right)
      .attr("height", chartArea_height + margin.top + margin.bottom);

    //make group root of svg for transformation purpose
    var jitterWidth = 500;
    let svgGroup = svg
      .append("g")
      .attr("id", "snpdist_svgGroup")
      .attr(
        "transform",
        "translate(" + margin.left + "," + margin.top + ")scale(1)"
      );

    // create scale based on orientation
    let scale_y = chartOrientation === "vertical" ? scale_v : scale_h;
    scale_y.domain([data_stats.min, data_stats.max]);

    // create axis
    //axis
    const axis_y =
      chartOrientation === "vertical" ? d3Axis.axisLeft() : d3Axis.axisBottom();
    axis_y.scale(scale_y).tickSize([5]);
    //axis group
    svgGroup.append("g").call(axis_y);

    //create jitter plot
    svgGroup
      .append("g")
      .attr("id", "jitter-group")
      .selectAll(".snp-dist-points")
      .data(chart_data)
      .enter()
      .append("circle")
      .attr("class", "snp-dist-points")
      .attr("cy", function (d) {
        let res =
          chartOrientation === "vertical"
            ? scale_y(d.value)
            : jitterWidth / 2 + Math.random() * jitterWidth;
        return res;
      })
      .attr("cx", function (d) {
        let res =
          chartOrientation === "vertical"
            ? jitterWidth / 2 + Math.random() * jitterWidth
            : scale_y(d.value);
        return res;
      })
      .attr("r", 3)
      .style("fill", "white")
      .attr("stroke", "black");

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
