import { scaleOrdinal, scaleSequential } from "d3-scale";

export function filterUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export function colorOrdinalInterpolator(domainList, d3ChromaInterpolator) {
  //domainList: [locA, locB, locC]
  //d3ChromaInterpolator: d3.InterpolateSpectral
  //return a function (interpolator) from a given domain and d3 interpolator
  var domainInterpolator = scaleSequential()
    .domain([0, domainList.length])
    .interpolator(d3ChromaInterpolator);
  var colorList = [];
  for (var i = 0; i < domainList.length; i++) {
    colorList.push(domainInterpolator(i));
  }
  var colorScale = scaleOrdinal().domain(domainList).range(colorList);
  return colorScale;
}
