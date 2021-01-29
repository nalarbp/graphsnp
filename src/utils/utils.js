import { scaleOrdinal, scaleSequential } from "d3-scale";
import * as d3Chroma from "d3-scale-chromatic";

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

export function createColorLUT(sampleJSON, colorIndex) {
  //input list of sample object [{sample:MS2, vanType: vanA}, ... ], colorIndex e.g vanType
  //output a Map of sample return color
  let colorLUT = null;
  if (Array.isArray(sampleJSON) && sampleJSON.length > 0) {
    let groups = sampleJSON
      .map((d) => {
        return d[colorIndex];
      })
      .filter(filterUnique);
    let colorInterpolator = colorOrdinalInterpolator(
      groups,
      d3Chroma.interpolateViridis
    );
    let colorMap = new Map();
    sampleJSON.forEach((d) => {
      colorMap.set(d.sample, colorInterpolator(d[colorIndex]));
    });
    //console.log(colorMap);
    colorLUT = colorMap;
  }
  return colorLUT;
}

export function getColorByColorIndex(query, colIndex, colLUT) {
  let col = "lightgray";
  if (colIndex !== "na") {
    let lut = colLUT[colIndex];
    col = lut.get(query) ? lut.get(query) : "lightgray";
  }
  return col;
}
