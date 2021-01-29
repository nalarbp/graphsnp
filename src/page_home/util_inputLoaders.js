import { csv } from "d3-fetch";
import { utcParse } from "d3-time-format";
import * as util from "../utils/utils";
const _ = require("lodash");

export const isoDateParser = utcParse("%Y-%m-%d");
//========================== METADATA ============================
export async function getMetadataInput(
  fileURL,
  metadataToStore,
  colorLUTtoStore,
  setisLoading
) {
  let data_promise_raw = await csv(fileURL).then(function (result) {
    return result;
  });
  const validHeaders = ["sample_id", "sample_date"];
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
  let isolate_date_invalid = false;
  data_promise_raw.forEach(function (d) {
    d.sample_id = d.sample_id.replace(/\s*$/, "");
    d.sample_date = d.sample_date.replace(/\s*$/, "");
    if (isoDateParser(d.sample_date)) {
      d["uid"] = d.sample_id;
      d.sample_date = isoDateParser(d.sample_date);
    } else {
      isolate_date_invalid = true;
    }
  });

  if (isolate_date_invalid) {
    alert("Invalid data: wrong date format in column sample date");
    setisLoading(false);
    return;
  }

  //Get other available metadata for color
  let headers_for_colorLUT = inputHeaders.filter((d) => {
    return d !== "sample_id" && d !== "sample_date";
  });
  let colorLUTstore = {};
  headers_for_colorLUT.forEach((d) => {
    const columnHeader = d;
    let row_group = [];
    let cells = [];
    data_promise_raw.forEach((d) => {
      let cell = {};
      cell["sample"] = d.sample_id;
      cell[columnHeader] = d[columnHeader];
      cells.push(cell);
      row_group.push(d[columnHeader]);
    });

    row_group.filter(util.filterUnique);
    let colorLUT = util.createColorLUT(cells, columnHeader);
    colorLUTstore[columnHeader] = colorLUT;
  });

  //Convert isolateDate into Map
  let metadata_Map = new Map();
  data_promise_raw.forEach((d) => {
    metadata_Map.set(d.sample_id, d);
  });

  console.log(colorLUTstore);

  //When all pass validation test, send to store
  metadataToStore(metadata_Map);
  colorLUTtoStore(colorLUTstore);
  setisLoading(false);
}
