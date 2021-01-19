import * as constant from "../utils/constants";

export function graphMatrixToStore(val) {
  return {
    type: constant.MATRIX_DATA,
    payload: val,
  };
}
