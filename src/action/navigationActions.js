import * as constant from "../utils/constants";

export function changeNavLocation(val) {
  return {
    type: constant.NAV_LOCATION,
    payload: val,
  };
}
