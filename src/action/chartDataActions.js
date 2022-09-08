import * as constant from "../utils/constants";

export function chart_changeAllDistData(val) {
  return {
    type: constant.CHART_ALL_DIST,
    payload: val,
  };
}

export function chart_changeAllDistStats(val) {
  return {
    type: constant.CHART_ALL_STATS,
    payload: val,
  };
}

export function chart_changeGroupPieData(val) {
  return {
    type: constant.CHART_GROUP_PIE,
    payload: val,
  };
}

export function chart_changeGroupDistStats(val) {
  return {
    type: constant.CHART_GROUP_STATS,
    payload: val,
  };
}

export function chart_changeGroupDistIntraInter(val) {
  return {
    type: constant.CHART_GROUP_INTRA_INTER,
    payload: val,
  };
}
