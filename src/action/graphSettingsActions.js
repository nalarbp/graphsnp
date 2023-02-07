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

export function changeIsEdgeScaledSetting(val) {
  return {
    type: constant.SETTING_IS_EDGE_SCALED,
    payload: val,
  };
}

export function changeEdgeScaleFactorSetting(val) {
  return {
    type: constant.SETTING_EDGE_SCALE_FACTOR,
    payload: val,
  };
}

export function changeIsHideEdgesByCutoff(val) {
  return {
    type: constant.SETTING_IS_HIDE_EDGES,
    payload: val,
  };
}

export function changeEdgesHideCutoff(val) {
  return {
    type: constant.SETTING_EDGE_HIDE_CUTOFF,
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

export function changeTransIcludeLocLevel(val) {
  return {
    type: constant.SETTING_TRANS_LOC_LEVEL,
    payload: val,
  };
}

export function changeTypeOfAnalysisSetting(val) {
  return {
    type: constant.SETTING_TYPE_ANALYSIS,
    payload: val,
  };
}

export function changeChartSessionSetting(val) {
  return {
    type: constant.SETTING_CHART_SESSION,
    payload: val,
  };
}

export function changeIsUserLoadSessionSetting(val) {
  return {
    type: constant.SETTING_IS_USER_LOAD_SESSION,
    payload: val,
  };
}

export function changeSelectedNode(val) {
  return {
    type: constant.SELECTED_NODE,
    payload: val,
  };
}

export function changeIsUserRelayoutSetting(val) {
  return {
    type: constant.SETTING_IS_USER_RELAYOUT,
    payload: val,
  };
}

export function changeNodeIsLabelShown(val) {
  return {
    type: constant.SETTING_NODE_IS_LABEL_SHOWN,
    payload: val,
  };
}

export function changeEdgeLabelSizeSetting(val) {
  return {
    type: constant.SETTING_EDGE_LABEL_SIZE,
    payload: val,
  };
}

export function changeNodeSizeSetting(val) {
  return {
    type: constant.SETTING_NODE_SIZE,
    payload: val,
  };
}
