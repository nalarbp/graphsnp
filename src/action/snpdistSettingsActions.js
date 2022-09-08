import * as constant from "../utils/constants";

export function dist_changeDataToDisplay(val) {
  return {
    type: constant.DIST_DATA_TO_DISPLAY,
    payload: val,
  };
}

export function dist_changeDataColumn(val) {
  return {
    type: constant.DIST_DATA_COLUMN,
    payload: val,
  };
}

export function dist_changeDataColumnLevel(val) {
  return {
    type: constant.DIST_DATA_COLUMN_LEVEL,
    payload: val,
  };
}

export function dist_changeChartOrientation(val) {
  return {
    type: constant.DIST_CHART_ORIENTATION,
    payload: val,
  };
}

export function dist_changeChartType(val) {
  return {
    type: constant.DIST_CHART_TYPE,
    payload: val,
  };
}

export function dist_changeExportFormat(val) {
  return {
    type: constant.DIST_EXPORT_FORMAT,
    payload: val,
  };
}

export function dist_changeIsUserDraw(val) {
  return {
    type: constant.DIST_IS_USER_DRAW,
    payload: val,
  };
}

export function dist_changeIsUserExport(val) {
  return {
    type: constant.DIST_IS_USER_EXPORT,
    payload: val,
  };
}

export function dist_changeIsUserGenerateMatrix(val) {
  return {
    type: constant.DIST_IS_USER_GENERATE_MATRIX,
    payload: val,
  };
}

export function dist_changeChartSession(val) {
  return {
    type: constant.DIST_CHART_SESSION,
    payload: val,
  };
}

export function dist_changeIsUserLoadSession(val) {
  return {
    type: constant.DIST_IS_USER_LOAD_SESSION,
    payload: val,
  };
}
