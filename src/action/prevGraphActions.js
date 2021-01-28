import * as constant from "../utils/constants";

export function prevGraphToStore(val) {
  return {
    type: constant.PREV_GRAPH,
    payload: val,
  };
}
