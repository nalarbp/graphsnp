import { csv } from "d3-fetch";
import { utcParse } from "d3-time-format";
import Moment from "moment";
import { message } from "antd";
import { extendMoment } from "moment-range";
import * as util from "../utils/utils";
import HammingMatrix from "../model/hammingMatrix_prop";

const _ = require("lodash");
const moment = extendMoment(Moment);
const fastaToJson = require("bio-parsers").fastaToJson;

export const isoDateParser = utcParse("%Y-%m-%d");
//========================== SNPS ============================
export async function snpsLoader(
  fastaString,
  propsSequenceToStore,
  propsHmmMatrixToStore,
  propsIsinputLoadingToStore
) {
  //console.log("async");
  const sequenceJSON = await fastaToJson(fastaString);
  const snpsSequence = [];
  if (Array.isArray(sequenceJSON) && sequenceJSON.length > 1) {
    //console.log(sequenceJSON);
    //check all error message, alert, and no seq to store
    let isolateName = {};
    let seqLen = [];
    let noErr = true;
    for (let index = 0; index < sequenceJSON.length; index++) {
      let messages = sequenceJSON[index].messages;
      let parsedSequence = sequenceJSON[index].parsedSequence;
      let success = sequenceJSON[index].success;
      //tracking size
      if (seqLen.indexOf(parsedSequence.size) === -1) {
        seqLen.push(parsedSequence.size);
      }
      //check success parsing
      if (!success) {
        noErr = false;
        alert("Parsing error:", parsedSequence.name);
        propsIsinputLoadingToStore(false);
        break;
      }
      //check err messages
      if (messages.length > 0) {
        noErr = false;
        alert(messages[0]);
        propsIsinputLoadingToStore(false);
        break;
      }
      //check sequence length
      if (seqLen.length > 1) {
        noErr = false;
        alert("Size error: Alignment required sequences with same length");
        propsIsinputLoadingToStore(false);
        break;
      }
      //check duplicated isolate
      if (!isolateName[parsedSequence.name]) {
        isolateName[parsedSequence.name] = true;
      } else {
        noErr = false;
        alert("Sequence error: Duplicated sequence");
        propsIsinputLoadingToStore(false);
        break;
      }
      //making snpsSequence
      if (noErr) {
        snpsSequence.push({
          id: parsedSequence.name,
          size: parsedSequence.size,
          sequence: parsedSequence.sequence.toLowerCase(),
        });
      }
    }

    if (noErr) {
      //display success message
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
      }, 100);

      //load to store
    }
  } else {
    alert("Error: Required at least 2 sequences");
    propsIsinputLoadingToStore(false);
  }
}
//========================== METADATA ============================
export async function getMetadataInput(
  fileURL,
  metadataToStore,
  colorLUTtoStore,
  categoricalMapToStore,
  setisLoading
) {
  let data_promise_raw = await csv(fileURL).then(function (result) {
    return result;
  });
  const validHeaders = ["sample_id", "sample_date", "patient_id"];
  const inputHeaders = Object.keys(data_promise_raw[0]);
  let header_is_valid = true;
  validHeaders.forEach((item) => {
    if (inputHeaders.indexOf(item) === -1) {
      header_is_valid = false;
    }
  });

  if (!header_is_valid) {
    alert("Invalid headers: One or more required headers was not found");
    setisLoading(false);
    return;
  }

  // no duplicate in isolate name
  const sample_id = _.countBy(data_promise_raw, "sample_id");
  const duplicatedRecords = Object.keys(sample_id)
    .map((key) => {
      return { name: key, count: sample_id[key] };
    })
    .filter((d) => d.count > 1);

  if (duplicatedRecords.length > 0) {
    alert(
      "Invalid data: duplicate record in column sample id" +
        `${JSON.stringify(duplicatedRecords)}`
    );
    setisLoading(false);
    return;
  }

  // no empty record in sample_id
  const sample_id_empty = sample_id[""] ? true : false;

  if (sample_id_empty) {
    alert("Invalid data: column sample_id contain empty record");
    setisLoading(false);
    return;
  }

  // no empty record or invalid format in collection date
  let isolate_start_datevalid = false;
  data_promise_raw.forEach(function (d) {
    d.sample_id = d.sample_id.replace(/\s*$/, "");
    d.sample_date = d.sample_date.replace(/\s*$/, "");
    if (isoDateParser(d.sample_date)) {
      d["uid"] = d.sample_id;
      d.sample_date = isoDateParser(d.sample_date);
    } else {
      isolate_start_datevalid = true;
    }
  });

  if (isolate_start_datevalid) {
    alert("Invalid data: wrong date format in column sample date");
    setisLoading(false);
    return;
  }

  //Get other available metadata for color
  let headers_for_categoricalMap = [];
  let headers_userColorLUT = [];

  inputHeaders.forEach((h) => {
    let splittedHeader = h.split(":");
    let isHeaderForColor =
      splittedHeader.length > 1 && splittedHeader[1] === "color" ? true : false;
    if (isHeaderForColor) {
      headers_userColorLUT.push(splittedHeader[0]);
    } else {
      if (h !== "sample_id") {
        headers_for_categoricalMap.push(h);
      }
    }
  });

  // let headers_for_categoricalMap = inputHeaders.filter((d) => {
  //   //filter out headers that have
  //   return d !== "sample_id";
  // });

  let colorLUTstore = {};
  let categorical_Map = new Map();
  let excludedCategory = ["0", 0, "null", "na", "#N/A", "NA", "", "excluded"];
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

    //create categorical map
    //extract category on a row
    row_group.forEach((g) => {
      //{vanA: [taxaA, taxaB]}
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
    //create color LUT
    //check is there any header:color or not, if exist use this to create colorLUT, otherwise create new one
    let colorLUT = null;
    let isHeaderHasColor = headers_userColorLUT.indexOf(d) > -1 ? true : false;
    if (isHeaderHasColor) {
      //get column header:color
      let headerWithColor = d.concat(":color");
      colorLUT = util.colorLUTFromUser(headerWithColor, data_promise_raw);
    } else {
      colorLUT = util.createColorLUT(cells, columnHeader);
    }

    colorLUTstore[columnHeader] = colorLUT;
  });

  //Convert metadata into Map
  let metadata_Map = new Map();
  data_promise_raw.forEach((d) => {
    metadata_Map.set(d.sample_id, d);
  });

  //Create categorical Map object from metadata
  //{groupLocA: [taxa1, taxa2, ...], groupLocB: [taxa4, taxa6]}
  //for each column, get the categorical

  //console.log(colorLUTstore);

  //When all pass validation test, send to store
  metadataToStore(metadata_Map);
  colorLUTtoStore(colorLUTstore);
  categoricalMapToStore(categorical_Map);
  setisLoading(false);
}

//========================== Patient Movement ============================
export async function getPatientMovementInput(
  fileURL,
  patientMovementToStore,
  setisLoading
) {
  let data_promise_raw = await csv(fileURL).then(function (result) {
    return result;
  });
  const validHeaders = [
    "patient_id",
    "start_date",
    "end_date",
    "hospital_id",
    "ward_id",
    "bay_id",
    "bed_id",
  ];

  const nullRecords = [
    "null",
    "",
    " ",
    "na",
    "NA",
    "N/A",
    "#N/A",
    "NULL",
    "Null",
  ];
  const inputHeaders = Object.keys(data_promise_raw[0]);
  let header_is_valid = true;
  validHeaders.forEach((item) => {
    if (inputHeaders.indexOf(item) === -1) {
      header_is_valid = false;
    }
  });

  if (!header_is_valid) {
    alert("Invalid headers: One or more required headers was not found");
    setisLoading(false);
    return;
  }

  // no empty record or invalid format in date in and out
  let date_invalid = false;
  data_promise_raw.forEach(function (d) {
    d.patient_id = d.patient_id.replace(/\s*$/, "");
    d.start_date = d.start_date.replace(/\s*$/, "");
    d.end_date = d.end_date.replace(/\s*$/, "");
    d.hospital_id =
      nullRecords.indexOf(d.hospital_id) !== -1 //when id = NA and in consist of nullRecords null, tidak -1 artinya ada di null
        ? null
        : d.hospital_id.replace(/\s*$/, "");
    d.ward_id =
      nullRecords.indexOf(d.ward_id) !== -1
        ? null
        : d.ward_id.replace(/\s*$/, "");
    d.bay_id =
      nullRecords.indexOf(d.bay_id) !== -1
        ? null
        : d.bay_id.replace(/\s*$/, "");
    d.bed_id =
      nullRecords.indexOf(d.bed_id) !== -1
        ? null
        : d.bed_id.replace(/\s*$/, "");

    if (moment(d.start_date) && moment(d.end_date)) {
      d.start_date = moment(d.start_date);
      d.end_date = moment(d.end_date);
    } else {
      date_invalid = true;
    }
  });

  if (date_invalid) {
    alert(
      "Invalid data: wrong date format in column start_date and or end_date"
    );
    setisLoading(false);
    return;
  }

  //Start creating Patient stays Map:
  //key is pid, value is pid and StayList instance pid => pid: pat_id, stays: stayList

  let patientStaysMap = new Map();

  const patList = data_promise_raw
    .map((d) => d.patient_id)
    .filter(util.filterUnique);

  patList.forEach((p) => {
    let stays = [];
    let patStays = data_promise_raw.filter((d) => {
      return d.patient_id === p;
    });
    patStays.forEach((s) => {
      let stay = {
        pid: p,
        start_date: s.start_date,
        end_date: s.end_date,
        hospital_id: s.hospital_id,
        ward_id: s.ward_id,
        bay_id: s.bay_id,
        bed_id: s.bed_id,
      };
      stays.push(stay);
    });
    patientStaysMap.set(p, stays);
  });

  //When all pass validation test, send to store
  patientMovementToStore(patientStaysMap);
  setisLoading(false);
}
