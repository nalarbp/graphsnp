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
  const data_stats = {
    min: d3Array.min(chart_data),
    q1: d3Array.quantile(chart_data, 0.25),
    median: d3Array.median(chart_data),
    mean: d3Array.mean(chart_data),
    q3: d3Array.quantile(chart_data, 0.75),
    max: d3Array.max(chart_data),
  };
  const boxplot_width = chartOrientation === "vertical" ? 0.85 * w : 0.85 * h;
  const boxplot_center = chartOrientation === "vertical" ? 0.5 * w : 0.5 * h;
  const upperLim = upLim ? upLim : data_stats.max;
  const lowerLim = lowLim ? lowLim : data_stats.min;
  const jitterWidth = boxplot_width / 2;
  const jitterNodeSize = 10;

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

  const scale_v = d3Scale.scaleLinear().range([h, 0]); // bottom to top
  const scale_h = d3Scale.scaleLinear().range([0, w]); //left to right

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

  //create box plot
  let boxplot_g = svgGroup.append("g").attr("id", "boxplot-group");

  //create center line
  boxplot_g
    .append("line")
    .attr("id", "boxplot-center-line")
    .attr(
      "x1",
      chartOrientation === "vertical" ? boxplot_center : scale_y(data_stats.min)
    )
    .attr(
      "x2",
      chartOrientation === "vertical" ? boxplot_center : scale_y(data_stats.max)
    )
    .attr(
      "y1",
      chartOrientation === "vertical" ? scale_y(data_stats.min) : boxplot_center
    )
    .attr(
      "y2",
      chartOrientation === "vertical" ? scale_y(data_stats.max) : boxplot_center
    )
    .attr("stroke", "black");

  //create upper and lower whiskers
  boxplot_g
    .selectAll(".boxplot-whiskers-line")
    .data([data_stats.min, data_stats.max])
    .enter()
    .append("line")
    .attr("class", "boxplot-whiskers-line")
    .attr("x1", function (d) {
      let res =
        chartOrientation === "vertical"
          ? boxplot_center - boxplot_width / 10
          : scale_y(d);
      return res;
    })
    .attr("x2", function (d) {
      let res =
        chartOrientation === "vertical"
          ? boxplot_center + boxplot_width / 10
          : scale_y(d);
      return res;
    })
    .attr("y1", function (d) {
      let res =
        chartOrientation === "vertical"
          ? scale_y(d)
          : boxplot_center - boxplot_width / 10;
      return res;
    })
    .attr("y2", function (d) {
      let res =
        chartOrientation === "vertical"
          ? scale_y(d)
          : boxplot_center + boxplot_width / 10;
      return res;
    })
    .attr("stroke", "black");

  //create box
  boxplot_g
    .append("rect")
    .attr("id", "boxplot-box")
    .attr("x", function () {
      let res =
        chartOrientation === "vertical"
          ? boxplot_center - boxplot_width / 2
          : scale_y(data_stats.q1);
      return res;
    })
    .attr("y", function () {
      let res =
        chartOrientation === "vertical"
          ? scale_y(data_stats.q3)
          : boxplot_center - boxplot_width / 2;
      return res;
    })
    .attr("height", function () {
      let res =
        chartOrientation === "vertical"
          ? Math.abs(scale_y(data_stats.q1) - scale_y(data_stats.q3))
          : boxplot_width;
      return res;
    })
    .attr("width", function () {
      let res =
        chartOrientation === "vertical"
          ? boxplot_width
          : Math.abs(scale_y(data_stats.q1) - scale_y(data_stats.q3));
      return res;
    })
    .attr("stroke", "black")
    .style("fill", "none");

  //create median line
  boxplot_g
    .selectAll(".boxplot-median-line")
    .data([data_stats.median])
    .enter()
    .append("line")
    .attr("class", "boxplot-median-line")
    .attr("x1", function (d) {
      let res =
        chartOrientation === "vertical"
          ? boxplot_center - boxplot_width / 2
          : scale_y(d);
      return res;
    })
    .attr("x2", function (d) {
      let res =
        chartOrientation === "vertical"
          ? boxplot_center + boxplot_width / 2
          : scale_y(d);
      return res;
    })
    .attr("y1", function (d) {
      let res =
        chartOrientation === "vertical"
          ? scale_y(d)
          : boxplot_center - boxplot_width / 2;
      return res;
    })
    .attr("y2", function (d) {
      let res =
        chartOrientation === "vertical"
          ? scale_y(d)
          : boxplot_center + boxplot_width / 2;
      return res;
    })
    .attr("stroke", "black");

  // Add jitter

  svgGroup
    .append("g")
    .attr("id", "jitter-group")
    .selectAll(".snp-dist-points")
    .data(chart_data)
    .enter()
    .append("circle")
    .attr("class", "snp-dist-points")
    .attr("cx", function (d) {
      let res =
        chartOrientation === "vertical"
          ? boxplot_center - jitterWidth / 2 + Math.random() * jitterWidth
          : scale_y(d);
      return res;
    })
    .attr("cy", function (d) {
      let res =
        chartOrientation === "vertical"
          ? scale_y(d)
          : boxplot_center - jitterWidth / 2 + Math.random() * jitterWidth;
      return res;
    })
    .attr("r", jitterNodeSize)
    .style("fill", "white")
    .attr("stroke", "black");
}
