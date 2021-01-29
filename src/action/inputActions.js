import * as constant from "../utils/constants";

export function sequenceToStore(val) {
  return {
    type: constant.SEQ_DATA,
    payload: val,
  };
}

export function metadataToStore(val) {
  return {
    type: constant.COLDATE_DATA,
    payload: val,
  };
}

export function phyloTimeTreeToStore(val) {
  return {
    type: constant.EXPERIOD_DATA,
    payload: val,
  };
}

export function isinputLoadingToStore(val) {
  return {
    type: constant.INPUT_LOADING,
    payload: val,
  };
}
