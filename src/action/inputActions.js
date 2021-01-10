import * as constant from "../utils/constants";

export function sequenceToStore(val) {
  return {
    type: constant.SEQ_DATA,
    payload: val,
  };
}

export function colDatesToStore(val) {
  return {
    type: constant.COLDATE_DATA,
    payload: val,
  };
}

export function exposurePeriodToStore(val) {
  return {
    type: constant.EXPERIOD_DATA,
    payload: val,
  };
}
