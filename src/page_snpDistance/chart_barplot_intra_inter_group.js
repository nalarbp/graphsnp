import * as d3Scale from "d3-scale";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";

export function createBarPlot_intraInterGroup(
  svg,
  chart_data,
  w,
  h,
  margin,
  chartSessionToStore
) {
  //console.log("create plot", +new Date());
  let data_len = chart_data.length;
  let data_min = parseFloat(d3Array.min(chart_data)).toFixed(0);
  let data_max = parseFloat(d3Array.max(chart_data)).toFixed(0);
  let data_q1 = parseFloat(d3Array.quantile(chart_data, 0.25)).toFixed(1);
  let data_q3 = parseFloat(d3Array.quantile(chart_data, 0.75)).toFixed(1);
  let data_median = parseFloat(d3Array.median(chart_data)).toFixed(1);
  let data_mean = parseFloat(d3Array.mean(chart_data)).toFixed(1);

  //layout
  const margin_stats = 30;
  const cont_bar_w = w;
  const cont_bar_h = h - margin_stats;

  // ++++++++++++++ BAR +++++++++++++
  //prepare data
  //console.log("prepare data", +new Date());
  const barMap = d3Array.rollup(
    chart_data,
    (v) => v.length,
    (d) => d
  );
  const barData = Array.from(barMap.entries()); //[{0: isKey, 1: isValue}]
  const barSNP_dist = Array.from(barMap.keys());
  const barSNP_freq = Array.from(barMap.values());

  //scales
  const bar_linear_scale_v = d3Scale.scaleLinear().range([cont_bar_h, 0]);
  const bar_band_scale_h = d3Scale.scaleBand().range([0, cont_bar_w]);
  const bar_bandWidth =
    cont_bar_w / (d3Array.range(0, d3Array.max(barSNP_dist)).length + 1);

  //create scale
  let bar_linear_scale_x = bar_linear_scale_v;
  bar_linear_scale_x.domain([0, d3Array.max(barSNP_freq)]);

  let bar_band_scale_y = bar_band_scale_h;
  bar_band_scale_y.domain(d3Array.range(0, d3Array.max(barSNP_dist) + 1));

  // create axis
  //axis
  const bar_axis_x = d3Axis.axisLeft().scale(bar_linear_scale_x);

  const bar_axis_y = d3Axis
    .axisBottom()
    .scale(bar_band_scale_y)
    .tickValues(
      bar_band_scale_y.domain().filter(function (d, i) {
        return !(i % 10);
      })
    );

  //DRAWING
  //set svg dimension
  //console.log("drawing", +new Date());
  svg
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom);
  //make group root of svg for transformation purpose
  let svgGroup = svg
    .append("g")
    .attr("id", "snpdist_svgGroup")
    .attr(
      "transform",
      "translate(" + margin.left + "," + margin.top + ")scale(1)"
    );

  // ========= Statistics text ==========
  let stats_text = [
    "Pairwise distances (n:",
    data_len,
    "), Min: ",
    data_min,
    ", Q1:",
    data_q1,
    ", Mean:",
    data_mean,
    ", Median:",
    data_median,
    ", Q3:",
    data_q3,
    ", Max:",
    data_max,
  ].join("");

  let barchart_stats_g = svgGroup.append("g").attr("id", "barchart-stats-g");
  barchart_stats_g
    .append("text")
    .attr("x", 0)
    .attr("y", margin_stats / 2)
    .text(stats_text);

  // ========= BAR ==========
  let barchart_g = svgGroup
    .append("g")
    .attr("id", "barchart-g")
    .attr("transform", "translate(" + 0 + "," + margin_stats + ")scale(1)");

  //barchart horizontal axis
  let h_axis_g = barchart_g
    .append("g")
    .attr("id", "barchart-axis-y")
    .attr("transform", "translate(" + 0 + "," + cont_bar_h + ")scale(1)")
    .call(bar_axis_y);
  //h axis label
  h_axis_g
    .append("text")
    .attr("class", "h_axis_label")
    .attr("text-anchor", "end")
    .attr("x", 6)
    .attr("y", 6)
    .text("income per capita, inflation-adjusted (dollars)");

  //h axis label
  let h_axis_label_g = barchart_g
    .append("g")
    .attr("id", "h-axis-label-g")
    .attr(
      "transform",
      "translate(" + cont_bar_w / 2 + "," + cont_bar_h + ")scale(1)"
    );
  h_axis_label_g
    .append("text")
    .attr("id", "h-axis-label")
    .attr("text-anchor", "middle")
    .attr("x", 0)
    .attr("y", 35)
    .style("font-size", "8pt")
    .text("Pairwise SNP distance");

  //barchart vertical axis
  barchart_g
    .append("g")
    .attr("id", "barchart-axis-x")
    .attr("transform", "translate(" + -5 + "," + 0 + ")scale(1)")
    .call(bar_axis_x);

  //v axis label
  let v_axis_label_g = barchart_g
    .append("g")
    .attr("id", "v-axis-label-g")
    .attr(
      "transform",
      "translate(" + -5 + "," + cont_bar_h / 2 + ")scale(1) rotate(-90)"
    );
  v_axis_label_g
    .append("text")
    .attr("id", "v-axis-label")
    .attr("text-anchor", "middle")
    .attr("x", 0)
    .attr("y", -35)
    .style("font-size", "8pt")
    .text("Frequency");

  //add bar chart
  let bar_g = barchart_g.append("g").attr("id", "bar-group");
  bar_g
    .selectAll(".barchart-bar")
    .data(barData)
    .enter()
    .append("rect")
    .attr("class", "barchart-bar")
    .attr("stroke", "white")
    .attr("stroke-width", "0.5px")
    .attr("fill", "gray")
    .attr("x", function (d) {
      let res = bar_band_scale_y(d[0]);
      return res;
    })
    .attr("y", function (d) {
      let res = bar_linear_scale_x(d[1]);
      return res;
    })
    .attr("width", function (d) {
      let res = bar_bandWidth;
      return res;
    })
    .attr("height", function (d) {
      let res = Math.abs(bar_linear_scale_x(d[1]) - bar_linear_scale_x(0));
      return res;
    });
  //console.log("finish", +new Date());
  //save this session to store
  let thisSessionData = {
    w,
    h,
    margin,
    data_len,
    data_min,
    data_max,
    data_q1,
    data_q3,
    data_median,
    data_mean,
    margin_stats,
    cont_bar_w,
    cont_bar_h,
    barMap,
    barData,
    barSNP_dist,
    barSNP_freq,
    bar_linear_scale_v,
    bar_band_scale_h,
    bar_bandWidth,
    bar_linear_scale_x,
    bar_band_scale_y,
    bar_axis_x,
    bar_axis_y,
  };
  chartSessionToStore(thisSessionData);
}

export function recreateChart_intraInterGroup(svg, prevSessionData) {
  //Data we need:
  //console.log("create plot", +new Date());
  let w = prevSessionData.w;
  let h = prevSessionData.h;
  let margin = prevSessionData.margin;
  let data_len = prevSessionData.data_len;
  let data_min = prevSessionData.data_min;
  let data_max = prevSessionData.data_max;
  let data_q1 = prevSessionData.data_q1;
  let data_q3 = prevSessionData.data_q3;
  let data_median = prevSessionData.data_median;
  let data_mean = prevSessionData.data_mean;

  //layout
  const margin_stats = prevSessionData.margin_stats;
  const cont_bar_w = prevSessionData.cont_bar_w;
  const cont_bar_h = prevSessionData.cont_bar_h;

  // ++++++++++++++ BAR +++++++++++++
  //prepare data
  //console.log("prepare data", +new Date());
  const barMap = prevSessionData.barMap;
  const barData = prevSessionData.barData;
  const barSNP_dist = prevSessionData.barSNP_dist;
  const barSNP_freq = prevSessionData.barSNP_freq;

  //scales
  const bar_linear_scale_v = prevSessionData.bar_linear_scale_v;
  const bar_band_scale_h = prevSessionData.bar_band_scale_h;
  const bar_bandWidth = prevSessionData.bar_bandWidth;

  //create scale
  let bar_linear_scale_x = prevSessionData.bar_linear_scale_x;
  let bar_band_scale_y = prevSessionData.bar_band_scale_y;

  // create axis
  //axis
  const bar_axis_x = prevSessionData.bar_axis_x;
  const bar_axis_y = prevSessionData.bar_axis_y;

  //JUST DRAWING
  //set svg dimension
  //console.log("drawing", +new Date());
  svg
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom);
  //make group root of svg for transformation purpose
  let svgGroup = svg
    .append("g")
    .attr("id", "snpdist_svgGroup")
    .attr(
      "transform",
      "translate(" + margin.left + "," + margin.top + ")scale(1)"
    );

  // ========= Statistics text ==========
  let stats_text = [
    "Pairwise distances (n:",
    data_len,
    "), Min: ",
    data_min,
    ", Q1:",
    data_q1,
    ", Mean:",
    data_mean,
    ", Median:",
    data_median,
    ", Q3:",
    data_q3,
    ", Max:",
    data_max,
  ].join("");

  let barchart_stats_g = svgGroup.append("g").attr("id", "barchart-stats-g");
  barchart_stats_g
    .append("text")
    .attr("x", 0)
    .attr("y", margin_stats / 2)
    .text(stats_text);

  // ========= BAR ==========
  let barchart_g = svgGroup
    .append("g")
    .attr("id", "barchart-g")
    .attr("transform", "translate(" + 0 + "," + margin_stats + ")scale(1)");

  //barchart horizontal axis
  barchart_g
    .append("g")
    .attr("id", "barchart-axis-y")
    .attr("transform", "translate(" + 0 + "," + cont_bar_h + ")scale(1)")
    .call(bar_axis_y);

  //h axis label
  let h_axis_label_g = barchart_g
    .append("g")
    .attr("id", "h-axis-label-g")
    .attr(
      "transform",
      "translate(" + cont_bar_w / 2 + "," + cont_bar_h + ")scale(1)"
    );
  h_axis_label_g
    .append("text")
    .attr("id", "h-axis-label")
    .attr("text-anchor", "middle")
    .attr("x", 0)
    .attr("y", 35)
    .style("font-size", "8pt")
    .text("Pairwise SNP distance");

  //barchart vertical axis
  barchart_g
    .append("g")
    .attr("id", "barchart-axis-x")
    .attr("transform", "translate(" + -5 + "," + 0 + ")scale(1) ")
    .call(bar_axis_x);

  //v axis label
  let v_axis_label_g = barchart_g
    .append("g")
    .attr("id", "v-axis-label-g")
    .attr(
      "transform",
      "translate(" + -5 + "," + cont_bar_h / 2 + ")scale(1) rotate(-90)"
    );
  v_axis_label_g
    .append("text")
    .attr("id", "v-axis-label")
    .attr("text-anchor", "middle")
    .attr("x", 0)
    .attr("y", -35)
    .style("font-size", "8pt")
    .text("Frequency");

  //add bar chart
  let bar_g = barchart_g.append("g").attr("id", "bar-group");
  bar_g
    .selectAll(".barchart-bar")
    .data(barData)
    .enter()
    .append("rect")
    .attr("class", "barchart-bar")
    .attr("stroke", "white")
    .attr("stroke-width", "0.5px")
    .attr("fill", "gray")
    .attr("x", function (d) {
      let res = bar_band_scale_y(d[0]);
      return res;
    })
    .attr("y", function (d) {
      let res = bar_linear_scale_x(d[1]);
      return res;
    })
    .attr("width", function (d) {
      let res = bar_bandWidth;
      return res;
    })
    .attr("height", function (d) {
      let res = Math.abs(bar_linear_scale_x(d[1]) - bar_linear_scale_x(0));
      return res;
    });
  //console.log("finish", +new Date());
}
