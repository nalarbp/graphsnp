import * as constant from "../utils/constants";

export function resetStore(val) {
  return {
    type: constant.GENERAL_RESET,
    payload: val,
  };
}
