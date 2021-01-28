import * as constant from "../utils/constants";

export function changeMethodSetting(val) {
  return {
    type: constant.SETTING_METHOD,
    payload: val,
  };
}

export function changeLayoutSetting(val) {
  return {
    type: constant.SETTING_LAYOUT,
    payload: val,
  };
}

export function changeIsUserReDrawSetting(val) {
  return {
    type: constant.SETTING_IS_USER_REDRAW,
    payload: val,
  };
}

export function changeEdgeFilterCutoffSetting(val) {
  return {
    type: constant.SETTING_EDGE_FILTER_CUTOFF,
    payload: val,
  };
}

export function changeIsUserFilterEdgesSetting(val) {
  return {
    type: constant.SETTING_IS_USER_FILTER_EDGES,
    payload: val,
  };
}

export function changeClusterMethodSetting(val) {
  return {
    type: constant.SETTING_CLUSTER_METHOD,
    payload: val,
  };
}

export function changeIsUserClusteringSetting(val) {
  return {
    type: constant.SETTING_IS_USER_CLUSTERING,
    payload: val,
  };
}

export function changeColorNodeSetting(val) {
  return {
    type: constant.SETTING_COLOR_NODE_BY,
    payload: val,
  };
}

export function changeExportFormatSetting(val) {
  return {
    type: constant.SETTING_EXPORT_FORMAT,
    payload: val,
  };
}

export function changeIsUserDownloadingSetting(val) {
  return {
    type: constant.SETTING_IS_USER_DOWNLOADING,
    payload: val,
  };
}
