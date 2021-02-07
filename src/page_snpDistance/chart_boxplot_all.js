import * as d3Scale from "d3-scale";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";

export function createBoxplot(
  svg,
  chart_data,
  w,
  h,
  margin,
  chartOrientation,
  upLim,
  lowLim
) {
  let data_min = d3Array.min(chart_data);
  let data_max = d3Array.max(chart_data);
  let data_q1 = d3Array.quantile(chart_data, 0.25);
  let data_q3 = d3Array.quantile(chart_data, 0.75);
  let data_median = d3Array.median(chart_data);
  let data_mean = d3Array.mean(chart_data);
  let data_iqr = data_q3 - data_q1; // interquartile range
  let data_r0 = Math.max(data_min, data_q1 - data_iqr * 1.5);
  let data_r1 = Math.min(data_max, data_q3 + data_iqr * 1.5);

  //layout: 3 partition
  const cont_bar_w = chartOrientation === "vertical" ? h : w;
  const cont_bar_h = chartOrientation === "vertical" ? 0.4 * w : 0.4 * h;
  const cont_box_w = chartOrientation === "vertical" ? h : w;
  const cont_box_h = chartOrientation === "vertical" ? 0.2 * w : 0.2 * h;
  const cont_jitter_left = chartOrientation === "vertical" ? 0.4 * w : 0.4 * h;

  // ++++++++++++++ BAR +++++++++++++
  //prepare data
  const barMap = d3Array.rollup(
    chart_data,
    (v) => v.length,
    (d) => d
  );
  const barData = Array.from(barMap.entries()); //[{0: isKey, 1: isValue}]
  const barSNP_dist = Array.from(barMap.keys());
  const barSNP_freq = Array.from(barMap.values());

  //scales
  const bar_linear_scale_v = d3Scale.scaleLinear().range([cont_bar_h, 0]); // bottom to top
  const bar_linear_scale_h = d3Scale.scaleLinear().range([0, cont_bar_w]); //left to right

  const bar_band_scale_v = d3Scale.scaleBand().range([cont_bar_h, 0]); // bottom to top
  const bar_band_scale_h = d3Scale.scaleBand().range([0, cont_bar_w]); // bottom to top

  const bar_bandWidth =
    chartOrientation === "vertical"
      ? cont_bar_h / (d3Array.range(0, d3Array.max(barSNP_dist)).length + 1)
      : cont_bar_w / (d3Array.range(0, d3Array.max(barSNP_dist)).length + 1);

  //create scale
  let bar_linear_scale_x =
    chartOrientation === "vertical" ? bar_linear_scale_h : bar_linear_scale_v;
  bar_linear_scale_x.domain([0, d3Array.max(barSNP_freq)]);
  let bar_band_scale_y =
    chartOrientation === "vertical" ? bar_band_scale_v : bar_band_scale_h;
  bar_band_scale_y.domain(d3Array.range(0, d3Array.max(barSNP_dist) + 1));

  // create axis
  //axis
  const bar_axis_x =
    chartOrientation === "vertical" ? d3Axis.axisBottom() : d3Axis.axisLeft();
  bar_axis_x.scale(bar_linear_scale_x);
  const bar_axis_y =
    chartOrientation === "vertical" ? d3Axis.axisLeft() : d3Axis.axisBottom();
  bar_axis_y.scale(bar_band_scale_y);

  // ++++++++++++++ BOXPLOT +++++++++++++
  //prepare data
  const boxData = chart_data; //[1,2,3,4,..]

  //dimension
  const boxplot_width =
    chartOrientation === "vertical" ? 0.7 * cont_box_w : 0.7 * cont_box_h;
  const boxplot_center =
    chartOrientation === "vertical" ? 0.5 * cont_box_w : 0.5 * cont_box_w;

  //scale
  const box_band_scale_v = d3Scale.scaleBand().range([cont_box_h, 0]); //
  const box_band_scale_h = d3Scale.scaleBand().range([0, cont_box_w]); //

  const box_scale_y = box_band_scale_v;

  //DRAWING
  //set svg dimension
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

  // ========= BAR ==========
  //barchart axis group
  svgGroup.append("g").attr("id", "barchart-axis-y").call(bar_axis_y);
  svgGroup.append("g").attr("id", "barchart-axis-x").call(bar_axis_x);

  //add bar chart
  let barchart_g = svgGroup.append("g").attr("id", "barchart-group");
  barchart_g
    .selectAll(".barchart-bar")
    .data(barData)
    .enter()
    .append("rect")
    .attr("class", "barchart-bar")
    .attr("stroke", "gray")
    .attr("stroke-width", "0.5px")
    .attr("fill", "none")
    .attr("x", function (d) {
      let res =
        chartOrientation === "vertical"
          ? bar_linear_scale_x(0)
          : bar_band_scale_y(d[0]);
      return res;
    })
    .attr("y", function (d) {
      let res =
        chartOrientation === "vertical"
          ? bar_band_scale_y(d[0])
          : bar_linear_scale_x(d[1]);
      return res;
    })
    .attr("width", function (d) {
      let res =
        chartOrientation === "vertical"
          ? bar_linear_scale_x(d[1]) - bar_linear_scale_x(0)
          : bar_bandWidth;
      return res;
    })
    .attr("height", function (d) {
      let res =
        chartOrientation === "vertical"
          ? bar_bandWidth
          : Math.abs(bar_linear_scale_x(d[1]) - bar_linear_scale_x(0));
      return res;
    });

  const upperLim = upLim ? upLim : data_max;
  const lowerLim = lowLim ? lowLim : data_min;
  const jitterWidth = boxplot_width / 2;
  const jitterNodeSize = 10;

  //create box plot
  let boxplot_g = svgGroup.append("g").attr("id", "boxplot-group");

  //create center line
  boxplot_g
    .append("line")
    .attr("id", "boxplot-center-line")
    .attr(
      "x1",
      chartOrientation === "vertical" ? boxplot_center : box_scale_y(data_min)
    )
    .attr(
      "x2",
      chartOrientation === "vertical" ? boxplot_center : box_scale_y(data_max)
    )
    .attr(
      "y1",
      chartOrientation === "vertical" ? box_scale_y(data_min) : boxplot_center
    )
    .attr(
      "y2",
      chartOrientation === "vertical" ? box_scale_y(data_max) : boxplot_center
    )
    .attr("stroke", "black");

  //   //create upper and lower whiskers
  //   boxplot_g
  //     .selectAll(".boxplot-whiskers-line")
  //     .data([data_min, data_max])
  //     .enter()
  //     .append("line")
  //     .attr("class", "boxplot-whiskers-line")
  //     .attr("x1", function (d) {
  //       let res =
  //         chartOrientation === "vertical"
  //           ? boxplot_center - boxplot_width / 10
  //           : scale_y(d);
  //       return res;
  //     })
  //     .attr("x2", function (d) {
  //       let res =
  //         chartOrientation === "vertical"
  //           ? boxplot_center + boxplot_width / 10
  //           : scale_y(d);
  //       return res;
  //     })
  //     .attr("y1", function (d) {
  //       let res =
  //         chartOrientation === "vertical"
  //           ? scale_y(d)
  //           : boxplot_center - boxplot_width / 10;
  //       return res;
  //     })
  //     .attr("y2", function (d) {
  //       let res =
  //         chartOrientation === "vertical"
  //           ? scale_y(d)
  //           : boxplot_center + boxplot_width / 10;
  //       return res;
  //     })
  //     .attr("stroke", "black");

  //   //create box
  //   boxplot_g
  //     .append("rect")
  //     .attr("id", "boxplot-box")
  //     .attr("x", function () {
  //       let res =
  //         chartOrientation === "vertical"
  //           ? boxplot_center - boxplot_width / 2
  //           : scale_y(data_q1);
  //       return res;
  //     })
  //     .attr("y", function () {
  //       let res =
  //         chartOrientation === "vertical"
  //           ? scale_y(data_q3)
  //           : boxplot_center - boxplot_width / 2;
  //       return res;
  //     })
  //     .attr("height", function () {
  //       let res =
  //         chartOrientation === "vertical"
  //           ? Math.abs(scale_y(data_q1) - scale_y(data_q3))
  //           : boxplot_width;
  //       return res;
  //     })
  //     .attr("width", function () {
  //       let res =
  //         chartOrientation === "vertical"
  //           ? boxplot_width
  //           : Math.abs(scale_y(data_q1) - scale_y(data_q3));
  //       return res;
  //     })
  //     .attr("stroke", "black")
  //     .style("fill", "none");

  //   //create median line
  //   boxplot_g
  //     .selectAll(".boxplot-median-line")
  //     .data([data_median])
  //     .enter()
  //     .append("line")
  //     .attr("class", "boxplot-median-line")
  //     .attr("x1", function (d) {
  //       let res =
  //         chartOrientation === "vertical"
  //           ? boxplot_center - boxplot_width / 2
  //           : scale_y(d);
  //       return res;
  //     })
  //     .attr("x2", function (d) {
  //       let res =
  //         chartOrientation === "vertical"
  //           ? boxplot_center + boxplot_width / 2
  //           : scale_y(d);
  //       return res;
  //     })
  //     .attr("y1", function (d) {
  //       let res =
  //         chartOrientation === "vertical"
  //           ? scale_y(d)
  //           : boxplot_center - boxplot_width / 2;
  //       return res;
  //     })
  //     .attr("y2", function (d) {
  //       let res =
  //         chartOrientation === "vertical"
  //           ? scale_y(d)
  //           : boxplot_center + boxplot_width / 2;
  //       return res;
  //     })
  //     .attr("stroke", "black");

  //   // Add jitter

  //   svgGroup
  //     .append("g")
  //     .attr("id", "jitter-group")
  //     .selectAll(".snp-dist-points")
  //     .data(chart_data)
  //     .enter()
  //     .append("circle")
  //     .attr("class", "snp-dist-points")
  //     .attr("cx", function (d) {
  //       let res =
  //         chartOrientation === "vertical"
  //           ? boxplot_center - jitterWidth / 2 + Math.random() * jitterWidth
  //           : scale_y(d);
  //       return res;
  //     })
  //     .attr("cy", function (d) {
  //       let res =
  //         chartOrientation === "vertical"
  //           ? scale_y(d)
  //           : boxplot_center - jitterWidth / 2 + Math.random() * jitterWidth;
  //       return res;
  //     })
  //     .attr("r", jitterNodeSize)
  //     .style("fill", "white")
  //     .attr("stroke", "black");
}
