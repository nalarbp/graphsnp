import * as constant from "../utils/constants";

// ======================= LOAD DATA ====================
export function changeNavLocation(val) {
  return {
    type: constant.NAV_LOCATION,
    payload: val,
  };
}
