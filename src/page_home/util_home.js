import { message } from "antd";
import { csv } from "d3-fetch";
import { utcParse } from "d3-time-format";
import DistanceMatrix from "../model/distanceMatrix_prop.js";
import HammingMatrix from "../model/hammingMatrix_prop";
import * as util from "../utils/utils";

const _ = require("lodash");
const fastaToJson = require("bio-parsers").fastaToJson;

export const graphSNP_desc =
  "An interactive distance viewer for investigating outbreaks and transmission networks using a graph approach.";

export const isoDateParser = utcParse("%Y-%m-%d");
//SNPS
function replaceNon_ATGCN_chars(fastaText) {
  let processedFasta = "";
  let lines = fastaText.split("\n");

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (line.startsWith(">")) {
      processedFasta += line + "\n";
    } else {
      let processedLine = line.replace(/[^ATCGN]/g, "N");
      processedFasta += processedLine + "\n";
    }
  }
  return processedFasta;
}

export async function snpsLoader(
  fastaString,
  propsSequenceToStore,
  propsHmmMatrixToStore,
  propsIsinputLoadingToStore
) {
  console.time("loadingSNP");
  let fastaString_transformed = replaceNon_ATGCN_chars(fastaString);
  const sequenceJSON = await fastaToJson(fastaString_transformed);
  const snpsSequence = [];
  if (Array.isArray(sequenceJSON) && sequenceJSON.length > 1) {
    let isolateName = {};
    let seqLen = [];
    let noErr = true;

    for (let index = 0; index < sequenceJSON.length; index++) {
      let messages = sequenceJSON[index].messages;
      let parsedSequence = sequenceJSON[index].parsedSequence;
      let success = sequenceJSON[index].success;

      if (seqLen.indexOf(parsedSequence.size) === -1) {
        seqLen.push(parsedSequence.size);
      }

      if (!success) {
        noErr = false;
        alert("Parsing error:", parsedSequence.name);
        propsIsinputLoadingToStore(false);
        break;
      }

      if (messages.length > 0) {
        noErr = false;
        alert(messages[0]);
        propsIsinputLoadingToStore(false);
        break;
      }

      if (seqLen.length > 1) {
        noErr = false;
        alert("Size error: Alignment required sequences with same length");
        propsIsinputLoadingToStore(false);
        break;
      }

      if (!isolateName[parsedSequence.name]) {
        isolateName[parsedSequence.name] = true;
      } else {
        noErr = false;
        alert("Sequence error: Duplicated sequence");
        propsIsinputLoadingToStore(false);
        break;
      }

      if (noErr) {
        snpsSequence.push({
          id: parsedSequence.name,
          size: parsedSequence.size,
          sequence: parsedSequence.sequence.toLowerCase(),
        });
      }
    }

    if (noErr) {
      message.success(
        "The sequences have been loaded, now building distance matrix ..",
        1
      );
      setTimeout(() => {
        const hammingMatrix = new HammingMatrix(
          snpsSequence
        ).getHammingMatrix();
        message.success("Pair-wise SNP distance matrix has been created", 1);

        propsSequenceToStore(snpsSequence);
        propsHmmMatrixToStore(hammingMatrix);
        propsIsinputLoadingToStore(false);
        console.timeEnd("loadingSNP");
      }, 100);
    }
  } else {
    alert("Error: Check the SNP alignment input requirements");
    propsIsinputLoadingToStore(false);
  }
}

//DIST-MATRIX
export async function getMatrixInput(fileURL, matrixToStore, setisLoading) {
  console.time("loadingMatrix");
  let data_promise_super_raw = await csv(fileURL).then(function (result) {
    return result;
  });
  const headers = data_promise_super_raw.columns;
  const diag_name = headers[0];

  if (diag_name) {
    let rowNames = [diag_name];
    let data_promise_raw = [];

    data_promise_super_raw.forEach((d) => {
      let newD = {};
      headers.forEach((h) => {
        let valInt = h === diag_name ? String(d[h]) : parseFloat(d[h]);
        let keyString = String(h);
        newD[keyString] = valInt;
      });
      data_promise_raw.push(newD);
      rowNames.push(d[diag_name]);
    });

    let areColRowNamesIdentical =
      headers.length === rowNames.length
        ? headers.every((val, idx) => val === rowNames[idx])
        : false;

    if (areColRowNamesIdentical) {
      setTimeout(() => {
        const inputMatrix = new DistanceMatrix(
          data_promise_raw,
          headers
        ).createMatrix();
        message.success("Pairwise distance matrix has been created", 1);
        matrixToStore(inputMatrix);
        setisLoading(false);
        console.timeEnd("loadingMatrix");
      }, 100);
    } else {
      alert("Invalid CSV matrix: not symetrical");
      setisLoading(false);
    }
  } else {
    alert("First column in CSV matrix cannot an empty string");
    setisLoading(false);
  }
}
//METADATA
export async function getMetadataInput(
  fileURL,
  metadataToStore,
  colorLUTtoStore,
  categoricalMapToStore,
  setisLoading
) {
  console.time("loadingMetadata");
  let data_promise_raw = await csv(fileURL).then(function (result) {
    return result;
  });
  const validHeaders = ["sample_id"];
  const inputHeaders = Object.keys(data_promise_raw[0]);
  let header_is_valid = true;

  validHeaders.forEach((item) => {
    if (inputHeaders.indexOf(item) === -1) {
      header_is_valid = false;
    }
  });

  if (!header_is_valid) {
    alert("Error: Metadata requires sample_id column");
    setisLoading(false);
    return;
  }
  //add header transformation here

  const sample_id = _.countBy(data_promise_raw, "sample_id");
  const duplicatedRecords = Object.keys(sample_id)
    .map((key) => {
      return { name: key, count: sample_id[key] };
    })
    .filter((d) => d.count > 1);

  if (duplicatedRecords.length > 0) {
    alert("Error: Duplicated id(s)" + `${JSON.stringify(duplicatedRecords)}`);
    setisLoading(false);
    return;
  }

  const sample_id_empty = sample_id[""] ? true : false;
  if (sample_id_empty) {
    alert("Error: Empty id(s)");
    setisLoading(false);
    return;
  }

  if (Object.keys(data_promise_raw[0]).indexOf("collection_day") !== -1) {
    let isolate_start_datevalid = false;
    data_promise_raw.forEach(function (d) {
      d.sample_id = d.sample_id.replace(/\s*$/, "");
      d.collection_day =
        d.collection_day && parseInt(d.collection_day.replace(/\s*$/, ""))
          ? parseInt(d.collection_day.replace(/\s*$/, ""))
          : null;
      if (!d.collection_day) {
        isolate_start_datevalid = true;
      }
    });

    if (isolate_start_datevalid) {
      alert("Invalid collection_day ");
      setisLoading(false);
      return;
    }
  }

  let headers_for_categoricalMap = [];
  let headers_userColorLUT = [];
  inputHeaders.forEach((h) => {
    let splittedHeader = h.split(":");
    let isHeaderForColor =
      splittedHeader.length > 1 && splittedHeader[1] === "color" ? true : false;
    if (isHeaderForColor) {
      headers_userColorLUT.push(splittedHeader[0]);
    } else {
      if (h !== "sample_id" && h !== "collection_day") {
        headers_for_categoricalMap.push(h);
      }
    }
  });

  let colorLUTstore = {};
  let categorical_Map = new Map();
  let excludedCategory = [
    "0",
    0,
    "null",
    "na",
    "#N/A",
    "NA",
    "",
    "excluded",
    "nil",
  ];

  headers_for_categoricalMap.forEach((d) => {
    const columnHeader = d;
    let row_group = [];
    let cells = [];
    data_promise_raw.forEach((d) => {
      let cell = {}; //{sample: taxaA, header1: valueOfHeader1}
      cell["sample"] = d.sample_id;
      cell[columnHeader] = d[columnHeader];
      cells.push(cell);
      row_group.push(d[columnHeader]);
    });

    row_group.filter(util.filterUnique); //categorical: e.g vanA, vanB

    row_group.forEach((g) => {
      let gList = cells
        .filter((c) => {
          return c[columnHeader] === g;
        })
        .map((d) => d.sample);

      if (excludedCategory.indexOf(g) === -1) {
        let categoricalID = columnHeader.concat("-", g);
        categorical_Map.set(categoricalID, gList);
      }
    });

    let colorLUT = null;
    let isHeaderHasColor = headers_userColorLUT.indexOf(d) > -1 ? true : false;

    if (isHeaderHasColor) {
      let headerWithColor = d.concat(":color");
      colorLUT = util.colorLUTFromUser(headerWithColor, data_promise_raw);
    } else {
      colorLUT = util.createColorLUT(cells, columnHeader);
    }
    colorLUTstore[columnHeader] = colorLUT;
  });

  let metadata_Map = new Map();
  data_promise_raw.forEach((d) => {
    metadata_Map.set(d.sample_id, d);
  });

  metadataToStore(metadata_Map);
  colorLUTtoStore(colorLUTstore);
  categoricalMapToStore(categorical_Map);
  setisLoading(false);
}

//PROJECT JSON
export async function loadProjectJSON(project_json_url, projectJSONToStore) {
  let response = await fetch(project_json_url);
  let dataInBlob = await response.blob();
  const reader = new FileReader();
  reader.readAsText(dataInBlob);
  reader.onloadend = function (evt) {
    const dataJSON = JSON.parse(evt.target.result);
    const projects = new Map();
    dataJSON.projects.forEach((p) => {
      projects.set(p.id, p);
    });

    projectJSONToStore(projects);
  };
}

//SNPS read from preloaded dataset
export async function loadSNPsequence(
  fileURL,
  propsSequenceToStore,
  propsHmmMatrixToStore,
  propsIsinputLoadingToStore,
  snpsLoader
) {
  let response = await fetch(fileURL);

  propsIsinputLoadingToStore(true);
  let dataInBlob = await response.blob();
  const reader = new FileReader();
  reader.readAsText(dataInBlob);
  reader.onloadend = function (evt) {
    const dataText = evt.target.result;
    snpsLoader(
      dataText,
      propsSequenceToStore,
      propsHmmMatrixToStore,
      propsIsinputLoadingToStore
    );
  };
}

//Utils
export function extensionCheck(fileExtension) {
  let seqExtension = [".fa", ".fasta", ".fna", ".aln", ".msa"];
  let metaExtension = [".csv"];
  if (seqExtension.indexOf(fileExtension) !== -1) {
    return "SNP";
  }
  if (metaExtension.indexOf(fileExtension) !== -1) {
    return "MetaOrMatrix";
  }
}

export async function loadMetaOrMatrix(
  fileURL,
  metadataToStore,
  colorLUTtoStore,
  categoricalMapToStore,
  hmmMatrixToStore,
  isinputLoadingToStore
) {
  let data_promise_raw = await csv(fileURL).then(function (result) {
    return result;
  });
  let metaIdHeader = "sample_id";
  let inputHeaders = Object.keys(data_promise_raw[0]);

  if (inputHeaders.indexOf(metaIdHeader) !== -1) {
    getMetadataInput(
      fileURL,
      metadataToStore,
      colorLUTtoStore,
      categoricalMapToStore,
      isinputLoadingToStore
    );
  } else {
    getMatrixInput(fileURL, hmmMatrixToStore, isinputLoadingToStore);
  }
}

export const getParticleHeight = String(util.vh(100) - 400) + "px";
export const getParticleWidth = String(util.vw(100) - 50) + "px";
export const particleParams = {
  fpsLimit: 24,
  particles: {
    number: { value: 25 },
    size: { value: 4 },
    links: {
      enable: true,
      distance: 75,
    },
    move: {
      enable: true,
      speed: 2,
      outModes: {
        default: "bounce",
      },
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: false,
        mode: "repulse",
      },
    },
  },
  opacity: {
    value: 0.5,
  },
};
