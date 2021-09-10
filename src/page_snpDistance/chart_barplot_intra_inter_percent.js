import * as d3Scale from "d3-scale";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import * as d3Selection from "d3-selection";
import * as d3Fetches from "d3-fetch";

import { getBarChartTickValues } from "../utils/utils";

export function createBar_intraInter(
  svg,
  chart_data_intra,
  chart_data_inter,
  w_all,
  h_all,
  margin,
  chartSessionToStore
) {
  //GENERAL
  const margin_stats = 30;
  const margin_intra_inter = 30;
  const cont_bar_w = w_all;
  const cont_bar_h = h_all / 2 - margin_stats * 2;
  svg
    .attr("width", w_all + margin.left + margin.right)
    .attr("height", h_all + margin.top + margin.bottom);

  //DATA: INTRA-TOP
  let data_len_intra = chart_data_intra.length;
  let data_min_intra = parseFloat(d3Array.min(chart_data_intra)).toFixed(0);
  let data_max_intra = parseFloat(d3Array.max(chart_data_intra)).toFixed(0);
  let data_q1_intra = parseFloat(
    d3Array.quantile(chart_data_intra, 0.25)
  ).toFixed(1);
  let data_q3_intra = parseFloat(
    d3Array.quantile(chart_data_intra, 0.75)
  ).toFixed(1);
  let data_median_intra = parseFloat(d3Array.median(chart_data_intra)).toFixed(
    1
  );
  let data_mean_intra = parseFloat(d3Array.mean(chart_data_intra)).toFixed(1);

  //prepare data
  const barMap_intra = d3Array.rollup(
    chart_data_intra,
    (v) => v.length,
    (d) => d
  );
  const barData_intra_raw = Array.from(barMap_intra.entries()); //[{0: isKey, 1: isValue}]
  const barSNP_dist_intra = Array.from(barMap_intra.keys());
  const barSNP_freq_intra = Array.from(barMap_intra.values());
  const barSNP_percent_intra = barSNP_freq_intra.map(
    (d) => (d / d3Array.sum(barSNP_freq_intra)) * 100
  );
  const barData_intra = barData_intra_raw.map((d) => {
    d[1] = (d[1] / d3Array.sum(barSNP_freq_intra)) * 100;
    return d;
  });

  //DATA: INTER-BOTTOM
  let data_len_inter = chart_data_inter.length;
  let data_min_inter = parseFloat(d3Array.min(chart_data_inter)).toFixed(0);
  let data_max_inter = parseFloat(d3Array.max(chart_data_inter)).toFixed(0);
  let data_q1_inter = parseFloat(
    d3Array.quantile(chart_data_inter, 0.25)
  ).toFixed(1);
  let data_q3_inter = parseFloat(
    d3Array.quantile(chart_data_inter, 0.75)
  ).toFixed(1);
  let data_median_inter = parseFloat(d3Array.median(chart_data_inter)).toFixed(
    1
  );
  let data_mean_inter = parseFloat(d3Array.mean(chart_data_inter)).toFixed(1);

  //prepare data
  const barMap_inter = d3Array.rollup(
    chart_data_inter,
    (v) => v.length,
    (d) => d
  );
  const barData_inter_raw = Array.from(barMap_inter.entries()); //[{0: isKey, 1: isValue}]
  const barSNP_dist_inter = Array.from(barMap_inter.keys());
  const barSNP_freq_inter = Array.from(barMap_inter.values());
  const barSNP_percent_inter = barSNP_freq_inter.map(
    (d) => (d / d3Array.sum(barSNP_freq_inter)) * 100
  );
  const barData_inter = barData_inter_raw.map((d) => {
    d[1] = (d[1] / d3Array.sum(barSNP_freq_inter)) * 100;
    return d;
  });

//DRAWING: INTRA-TOP
  //scales
  const bar_linear_scale_v_intra = d3Scale.scaleLinear().range([cont_bar_h, 0]);
  const bar_band_scale_h_intra = d3Scale.scaleBand().range([0, cont_bar_w]);
  const bar_bandWidth_intra =
    cont_bar_w / (d3Array.range(0, d3Array.max(barSNP_dist_intra)).length + 1);

  //create scale
  let bar_linear_scale_x_intra = bar_linear_scale_v_intra;
  bar_linear_scale_x_intra.domain([0, d3Array.max(barSNP_percent_intra)]);

  let bar_band_scale_y_intra = bar_band_scale_h_intra;
  bar_band_scale_y_intra.domain(
    d3Array.range(0, d3Array.max(barSNP_dist_intra) + 1)
  );

  // create axis
  //axis
  const bar_axis_x_intra = d3Axis.axisLeft().scale(bar_linear_scale_x_intra);
  const bar_axis_y_intra = d3Axis
    .axisBottom()
    .scale(bar_band_scale_y_intra)
    .tickValues(getBarChartTickValues(bar_band_scale_y_intra.domain()));

  //DRAWING
  //make group root of svg for transformation purpose
  let svgGroup = svg.append("g").attr("id", "snpdist_svgGroup");

  let svgGroup_intra = svgGroup
    .append("g")
    .attr("id", "snpdist_svgGroup_intra")
    .attr(
      "transform",
      "translate(" + margin.left + "," + margin.top + ")scale(1)"
    );

  //stats text
  let stats_text_intra = [
    "INTRA-Group pairwise distances (n:",
    data_len_intra,
    "), Min: ",
    data_min_intra,
    ", Q1:",
    data_q1_intra,
    ", Median:",
    data_median_intra,
    ", Mean:",
    data_mean_intra,
    ", Q3:",
    data_q3_intra,
    ", Max:",
    data_max_intra,
  ].join("");

  let barchart_stats_g_intra = svgGroup_intra
    .append("g")
    .attr("id", "barchart-stats-g-intra");
  barchart_stats_g_intra
    .append("text")
    .attr("x", 0)
    .attr("y", margin_stats / 2)
    .text(stats_text_intra);

  let barchart_g_intra = svgGroup_intra
    .append("g")
    .attr("id", "barchart-g-intra")
    .attr("transform", "translate(" + 0 + "," + margin_stats + ")scale(1)");

  //h axis
  barchart_g_intra
    .append("g")
    .attr("id", "barchart-axis-y-intra")
    .attr("transform", "translate(" + 0 + "," + cont_bar_h + ")scale(1)")
    .call(bar_axis_y_intra);

  //h axis label group
  let h_axis_label_g_intra = barchart_g_intra
    .append("g")
    .attr("id", "h-axis-label-g-intra")
    .attr(
      "transform",
      "translate(" + cont_bar_w / 2 + "," + cont_bar_h + ")scale(1)"
    );

  //h axis label
  h_axis_label_g_intra
    .append("text")
    .attr("id", "h-axis-label-intra")
    .attr("text-anchor", "middle")
    .attr("x", 0)
    .attr("y", 35)
    .style("font-size", "8pt")
    .text("Pairwise SNP distance");

  //v axis
  barchart_g_intra
    .append("g")
    .attr("id", "barchart-axis-x-intra")
    .attr("transform", "translate(" + -5 + "," + 0 + ")scale(1)")
    .call(bar_axis_x_intra);

  //v axis label group
  let v_axis_label_g_intra = barchart_g_intra
    .append("g")
    .attr("id", "v-axis-label-g-intra")
    .attr(
      "transform",
      "translate(" + -5 + "," + cont_bar_h / 2 + ")scale(1) rotate(-90)"
    );

  //v axis label
  v_axis_label_g_intra
    .append("text")
    .attr("id", "v-axis-label-intra")
    .attr("text-anchor", "middle")
    .attr("x", 0)
    .attr("y", -35)
    .style("font-size", "8pt")
    .text("Percent (%)");

  //bar chart
  let bar_g_intra = barchart_g_intra.append("g").attr("id", "bar-group-intra");
  bar_g_intra
    .selectAll(".barchart-bar-intra")
    .data(barData_intra)
    .enter()
    .append("rect")
    .attr("class", "barchart-bar-intra")
    .attr("stroke", "white")
    .attr("stroke-width", "0.5px")
    .attr("fill", "gray")
    .attr("x", function (d) {
      let res = bar_band_scale_y_intra(d[0]);
      return res;
    })
    .attr("y", function (d) {
      let res = bar_linear_scale_x_intra(d[1]);
      return res;
    })
    .attr("width", function (d) {
      let res = bar_bandWidth_intra;
      return res;
    })
    .attr("height", function (d) {
      let res = Math.abs(
        bar_linear_scale_x_intra(d[1]) - bar_linear_scale_x_intra(0)
      );
      return res;
    });

  
//DRAWING: INTRA-TOP
  //scales
  const bar_linear_scale_v_inter = d3Scale.scaleLinear().range([cont_bar_h, 0]);
  const bar_band_scale_h_inter = d3Scale.scaleBand().range([0, cont_bar_w]);
  const bar_bandWidth_inter =
    cont_bar_w / (d3Array.range(0, d3Array.max(barSNP_dist_inter)).length + 1);

  //create scale
  let bar_linear_scale_x_inter = bar_linear_scale_v_inter;
  bar_linear_scale_x_inter.domain([0, d3Array.max(barSNP_percent_inter)]);

  let bar_band_scale_y_inter = bar_band_scale_h_inter;
  bar_band_scale_y_inter.domain(
    d3Array.range(0, d3Array.max(barSNP_dist_inter) + 1)
  );

  // create axis function
  const bar_axis_x_inter = d3Axis.axisLeft().scale(bar_linear_scale_x_inter);
  const bar_axis_y_inter = d3Axis
    .axisBottom()
    .scale(bar_band_scale_y_inter)
    .tickValues(getBarChartTickValues(bar_band_scale_y_inter.domain()));

  //DRAWING
  //make group root of svg for transformation purpose
  let translate_y_pos =
    cont_bar_h + margin_stats * 2 + margin.top + margin_intra_inter;

  let svgGroup_inter = svgGroup
    .append("g")
    .attr("id", "snpdist_svgGroup_inter")
    .attr(
      "transform",
      "translate(" + margin.left + "," + translate_y_pos + ")scale(1)"
    );

  //stats text
  let stats_text_inter = [
    "INTER-Group pairwise distances (n:",
    data_len_inter,
    "), Min: ",
    data_min_inter,
    ", Q1:",
    data_q1_inter,
    ", Median:",
    data_median_inter,
    ", Mean:",
    data_mean_inter,
    ", Q3:",
    data_q3_inter,
    ", Max:",
    data_max_inter,
  ].join("");

  let barchart_stats_g_inter = svgGroup_inter
    .append("g")
    .attr("id", "barchart-stats-g-inter");

  barchart_stats_g_inter
    .append("text")
    .attr("x", 0)
    .attr("y", margin_stats / 2)
    .text(stats_text_inter);

  let barchart_g_inter = svgGroup_inter
    .append("g")
    .attr("id", "barchart-g-inter")
    .attr("transform", "translate(" + 0 + "," + margin_stats + ")scale(1)");

  //h axis
  barchart_g_inter
    .append("g")
    .attr("id", "barchart-axis-y-inter")
    .attr("transform", "translate(" + 0 + "," + cont_bar_h + ")scale(1)")
    .call(bar_axis_y_inter);

  //h axis label group
  let h_axis_label_g_inter = barchart_g_inter
    .append("g")
    .attr("id", "h-axis-label-g-inter")
    .attr(
      "transform",
      "translate(" + cont_bar_w / 2 + "," + cont_bar_h + ")scale(1)"
    );

  //h axis label
  h_axis_label_g_inter
    .append("text")
    .attr("id", "h-axis-label-inter")
    .attr("text-anchor", "middle")
    .attr("x", 0)
    .attr("y", 35)
    .style("font-size", "8pt")
    .text("Pairwise SNP distance");

  //v axis
  barchart_g_inter
    .append("g")
    .attr("id", "barchart-axis-x-inter")
    .attr("transform", "translate(" + -5 + "," + 0 + ")scale(1)")
    .call(bar_axis_x_inter);

  //v axis label group
  let v_axis_label_g_inter = barchart_g_inter
    .append("g")
    .attr("id", "v-axis-label-g-inter")
    .attr(
      "transform",
      "translate(" + -5 + "," + cont_bar_h / 2 + ")scale(1) rotate(-90)"
    );

  //v axis label
  v_axis_label_g_inter
    .append("text")
    .attr("id", "v-axis-label-inter")
    .attr("text-anchor", "middle")
    .attr("x", 0)
    .attr("y", -35)
    .style("font-size", "8pt")
    .text("Percent (%)");

  //bar chart
  let bar_g_inter = barchart_g_inter.append("g").attr("id", "bar-group-inter");
  bar_g_inter
    .selectAll(".barchart-bar-inter")
    .data(barData_inter)
    .enter()
    .append("rect")
    .attr("class", "barchart-bar-inter")
    .attr("stroke", "white")
    .attr("stroke-width", "0.5px")
    .attr("fill", "gray")
    .attr("x", function (d) {
      let res = bar_band_scale_y_inter(d[0]);
      return res;
    })
    .attr("y", function (d) {
      let res = bar_linear_scale_x_inter(d[1]);
      return res;
    })
    .attr("width", function (d) {
      let res = bar_bandWidth_inter;
      return res;
    })
    .attr("height", function (d) {
      let res = Math.abs(
        bar_linear_scale_x_inter(d[1]) - bar_linear_scale_x_inter(0)
      );
      return res;
    });
  //end inter

  //console.log("finish", +new Date());
  //save this session to store
  // let svgGroup_node = svgGroup.node();
  // console.log(svgGroup_node);
  // let thisSessionData = {
  //   type: "intra-inter-group",
  //   svgGroup_node,
  //   w: w_all,
  //   h: h_all,
  //   margin,
  // };
  // chartSessionToStore(thisSessionData);
}

export function recreateBar_intraInter(svg, prevSessionData) {
  console.log(svg, prevSessionData);
  svg
    .attr(
      "width",
      prevSessionData.w +
        prevSessionData.margin.left +
        prevSessionData.margin.right
    )
    .attr(
      "height",
      prevSessionData.h +
        prevSessionData.margin.top +
        prevSessionData.margin.bottom
    );
  svg.append(prevSessionData.svgGroup_node.node());
  //make group root of svg for transformation purpose
  // let svgGroup_node = d3Selection
  //   .select(prevSessionData.svgGroup_root)
  //   .select("#snpdist_svgGroup")
  //   .node();
  // console.log(svgGroup_node);
}
