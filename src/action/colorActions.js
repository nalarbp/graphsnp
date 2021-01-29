import * as constant from "../utils/constants";

export function colorLUTtoStore(val) {
  //value is an object {byLoc: locLUT, byCluster: clusterLUT etc}
  return {
    type: constant.COLOR_LUT,
    payload: val,
  };
}
