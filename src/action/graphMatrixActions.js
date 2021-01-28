import * as constant from "../utils/constants";

//Store hamming matrix
export function hmmMatrixToStore(val) {
  return {
    type: constant.MATRIX_HAMMING,
    payload: val,
  };
}

//Store graph object
export function graphObjectToStore(val) {
  return {
    type: constant.GRAPH_OBJECT,
    payload: val,
  };
}

//Store graph cluster
export function graphClusterToStore(val) {
  return {
    type: constant.GRAPH_CLUSTER,
    payload: val,
  };
}
