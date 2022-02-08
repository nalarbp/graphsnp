import * as constant from "../utils/constants";

export function projectJSONToStore(val) {
  return {
    type: constant.PROJECTS_JSON,
    payload: val,
  };
}

export function sequenceToStore(val) {
  return {
    type: constant.SEQ_DATA,
    payload: val,
  };
}

export function metadataToStore(val) {
  return {
    type: constant.META_DATA,
    payload: val,
  };
}

export function patientMovementToStore(val) {
  return {
    type: constant.TIME_TREE_DATA,
    payload: val,
  };
}

export function isinputLoadingToStore(val) {
  return {
    type: constant.INPUT_LOADING,
    payload: val,
  };
}

export function selectDemoDataToStore(val) {
  return {
    type: constant.SELECT_DEMO_DATA,
    payload: val,
  };
}
