import * as constant from "../utils/constants";

export function categoricalMapToStore(val) {
  //value is a Map {groupLocA: [taxa1, taxa2, ...], groupLocB: [taxa4, taxa6]}
  return {
    type: constant.METADATA_CATEGORICAL,
    payload: val,
  };
}
