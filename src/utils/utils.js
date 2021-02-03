import { scaleOrdinal, scaleSequential } from "d3-scale";
import * as d3Chroma from "d3-scale-chromatic";

const _ = require("lodash");

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
  var colorScale = scaleOrdinal().domain(domainList).range(d3Chroma.schemeSet3);
  return colorScale;
}

export function createColorLUT(raw_sampleJSON, colorIndex) {
  //input list of sample object [{sample:MS2, vanType: vanA}, ... ], colorIndex e.g vanType
  //output a Map of sample return color
  let sampleJSON = _.cloneDeep(raw_sampleJSON);
  let colorLUT = null;
  if (Array.isArray(sampleJSON) && sampleJSON.length > 0) {
    //remove na from clusterID
    if (colorIndex === "clusterID") {
      sampleJSON = sampleJSON.filter((d) => {
        return d.clusterID !== "na";
      });
    }
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

export function getEdgeAndArrowWidth(
  isEdgeWeightApplied,
  edgeWeight,
  weightFactor,
  option
) {
  if (isEdgeWeightApplied) {
    let weight = edgeWeight + 1; //normalized weight to avoid 0
    let width = weight ? weight * weightFactor : 3;
    if (option === "edge") {
      return width;
    } else {
      let arrow_w = width < 1 ? width : 1;
      return arrow_w;
    }
  } else {
    if (option === "edge") {
      return 3;
    } else {
      return 1;
    }
  }
}

export function vh(v) {
  var h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  return (v * h) / 100;
}

export function vw(v) {
  var w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  return (v * w) / 100;
}
