import * as d3Array from "d3-array";
import { color } from "d3-color";
import { scaleOrdinal, scaleSequential } from "d3-scale";
import * as d3Chroma from "d3-scale-chromatic";
import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);
const _ = require("lodash");

export function filterUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export function colorInterpolatorDateSeq(dateRange) {
  //domainInRange: [DateMin, max] to be converted into list of isoWeekAndYear
  //return a function (interpolator) from a given domain and d3 interpolator
  let momentStartDate = moment(dateRange[0]);
  let momentEndDate = moment(dateRange[1]);
  let isoWeek_start = momentStartDate.isoWeek().toString();
  let isoWeek_end = momentEndDate.isoWeek().toString();

  let isoWeekYear_start = momentStartDate.isoWeekYear().toString();
  let isoWeekYear_end = momentEndDate.isoWeekYear().toString();

  let isoWeekAndYear_start = parseInt(isoWeekYear_start + isoWeek_start);
  let isoWeekAndYear_end = parseInt(isoWeekYear_end + isoWeek_end);

  let domainInterpolator = scaleSequential(d3Chroma.interpolateYlOrRd).domain([
    isoWeekAndYear_start,
    isoWeekAndYear_end,
  ]);

  return domainInterpolator;
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
    let groupsAll = [];
    let sampleDates = [];
    sampleJSON.forEach((d) => {
      groupsAll.push(d[colorIndex]);
      if (colorIndex === "sample_date") {
        sampleDates.push(d.sample_date);
      }
    });

    let groups = groupsAll.filter(filterUnique); // array of unique element as the group (levels)
    let sampleDateRange =
      sampleDates.length > 0 ? d3Array.extent(sampleDates) : null;

    //d3Chroma.schemeSet3 only has 12 color, if you have 13 dateset, the 13th will be same as the 1st
    let colorInterpolatorOrd = scaleOrdinal(d3Chroma.schemeSet3).domain(groups);

    let colorInterpolatorSeq = sampleDateRange
      ? colorInterpolatorDateSeq(sampleDateRange)
      : null; //required input: a isoWeekAndYear, output: color

    let colorMap = new Map();
    sampleJSON.forEach((d) => {
      if (colorIndex === "collectionDay") {
        let isoWeekAndYear = d[colorIndex];
        let resultColor = color(
          colorInterpolatorSeq(isoWeekAndYear)
        ).formatHex();

        colorMap.set(d.sample, resultColor); //return sample_id as key, and color in
      } else {
        colorMap.set(d.sample, colorInterpolatorOrd(d[colorIndex]));
      }
    });
    //console.log(colorMap);
    colorLUT = colorMap;
  }
  return colorLUT;
}

export function colorLUTFromUser(headerWithColor, data_promise_raw) {
  let data_raw = _.cloneDeep(data_promise_raw);
  let colorMap = new Map();
  //iterate each row and set the map by sample_id and color
  data_raw.forEach((r) => {
    let col =
      r[headerWithColor] && color(r[headerWithColor])
        ? color(r[headerWithColor]).formatHex()
        : color("lightgray").formatHex();
    colorMap.set(r.sample_id, col);
  });
  return colorMap;
}

export function getColorByColorIndex(query, colIndex, colLUT) {
  let col = "lightgray";
  if (colLUT[colIndex] && colIndex !== "na") {
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
    let width = weight ? weight * weightFactor : 1;
    if (option === "edge") {
      return width;
    } else {
      let arrow_w = width < 1 ? width : 0.5;
      return arrow_w;
    }
  } else {
    if (option === "edge") {
      return 1;
    } else {
      return 0.5;
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

export function getMovementOverlapScore(p1_stay, p2_stay) {
  //
  // if
}

export function getHighestLocation(stay) {
  // return the highest available location in number format
  let res = 0;
  if (stay.hospital_id) {
    res = 1;
    if (stay.ward_id) {
      res = 2;
      if (stay.bay_id) {
        res = 3;
        if (stay.bed_id) {
          res = 4;
        }
      }
    }
  }
  return res;
}

export function getOverlapLocationLevel(stay_1, stay_2) {
  let res = 0;
  if (stay_1.hospital_id === stay_2.hospital_id) {
    res = 1;
    if (stay_1.ward_id === stay_2.ward_id) {
      res = 2;
      if (stay_1.bay_id === stay_2.bay_id) {
        res = 3;
        if (stay_1.bed_id === stay_2.bed_id) {
          res = 4;
        }
      }
    }
  }
  return res;
}

export function filterInverseSymEdges(symEdges) {
  let tracker = new Map();
  let upperTriangle = symEdges.filter(function (g) {
    let currentPair = g.source.concat("-", g.target);
    let inversePair = g.target.concat("-", g.source);

    let inverseEdge = symEdges.find(function (h) {
      return h.source === g.target && h.target === g.source;
    });

    if (inverseEdge) {
      if (tracker.get(inversePair) || tracker.get(currentPair)) {
        return false;
      } else {
        tracker.set(currentPair, true);
        tracker.set(inversePair, true);
        return true;
      }
    } else {
      tracker.set(currentPair, true);
      tracker.set(inversePair, true);
      return true;
    }
  });
  return upperTriangle;
}

export function downloadFileAsText(filename, text) {
  let element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export function downloadSVG(id) {
  //const svgsaver = new SVGSaver();
  let svg_node = document.querySelector(`#${id}`);
  let XMLS = new XMLSerializer();
  if (id === "summary-piechart") {
    svg_node = document.querySelector(`#${id} svg`);
  }
  let svgString = XMLS.serializeToString(svg_node);
  downloadFileAsText(`GraphSNP-${id}.svg`, svgString);
}

export function getBarChartTickValues(domain_arr) {
  let domain_len = domain_arr.length;
  let res = [];
  //if 10 => %1, 100 => %10, 1000 => %100, 10.000 => %1000
  if (domain_len <= 10) {
    res = domain_arr.filter(function (d, i) {
      return !(i % 1);
    });
    return res;
  }

  if (domain_len > 10 && domain_len <= 100) {
    res = domain_arr.filter(function (d, i) {
      return !(i % 5);
    });
    return res;
  }

  if (domain_len > 100 && domain_len <= 1000) {
    res = domain_arr.filter(function (d, i) {
      return !(i % 25);
    });
    return res;
  }

  if (domain_len > 1000 && domain_len <= 10000) {
    res = domain_arr.filter(function (d, i) {
      return !(i % 50);
    });
    return res;
  }

  if (domain_len > 10000) {
    res = domain_arr.filter(function (d, i) {
      return !(i % 100);
    });
    return res;
  }
}

export function getStats(arr) {
  if (Array.isArray(arr)) {
    return {
      min: parseFloat(d3Array.min(arr)).toFixed(0),
      q1: parseFloat(d3Array.quantile(arr, 0.25)).toFixed(1),
      mean: parseFloat(d3Array.mean(arr)).toFixed(1),
      median: parseFloat(d3Array.median(arr)).toFixed(1),
      q3: parseFloat(d3Array.quantile(arr, 0.75)).toFixed(1),
      max: parseFloat(d3Array.max(arr)).toFixed(0),
    };
  } else {
    return null;
  }
}

// Function to convert SVG string to Data URL
function svgToDataURL(svgString) {
  var svgData = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  var domURL = window.URL || window.webkitURL || window;
  var url = domURL.createObjectURL(svgData);
  return url;
}

//create a function that takes an object and return an svg string. This svg string must can be used as background image.
export function createSVGStringFromObject(obj_in) {
  var svgString =
    '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">' +
    '<circle cx="25" cy="25" r="20" fill="purple" />' +
    "</svg>";

  let a = svgToDataURL(svgString);
  console.log(a);
  return a;
}
