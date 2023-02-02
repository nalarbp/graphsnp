import { initialState } from ".";
import * as constant from "../utils/constants";

const snpDistSettingsReducer = (prevState, action) => {
  switch (action.type) {
    case constant.DIST_DATA_TO_DISPLAY:
      let newState_dts = Object.assign({}, prevState);
      if (action.payload && action.payload !== prevState.dataToDisplay) {
        newState_dts.dataToDisplay = action.payload;
      }
      return newState_dts; // if no change return same state with before

    case constant.DIST_DATA_COLUMN:
      let newState_dc = Object.assign({}, prevState);
      if (action.payload !== prevState.dataColumn) {
        newState_dc.dataColumn = action.payload;
      }
      return newState_dc;

    case constant.DIST_DATA_COLUMN_LEVEL:
      let newState_dc_lv = Object.assign({}, prevState);
      if (action.payload && action.payload !== prevState.dataColumnLevel) {
        newState_dc_lv.dataColumnLevel = action.payload;
      }
      return newState_dc_lv;

    case constant.DIST_CHART_ORIENTATION:
      let newState_co = Object.assign({}, prevState);
      if (action.payload !== prevState.chartOrientation) {
        newState_co.chartOrientation = action.payload;
      }
      return newState_co;

    case constant.DIST_CHART_TYPE:
      let newState_ct = Object.assign({}, prevState);
      if (action.payload !== prevState.chartType) {
        newState_ct.chartType = action.payload;
      }
      return newState_ct;

    case constant.DIST_EXPORT_FORMAT:
      let newState_ef = Object.assign({}, prevState);
      if (action.payload && action.payload !== prevState.snpDistExportFormat) {
        newState_ef.snpDistExportFormat = action.payload;
      }
      return newState_ef;

    case constant.DIST_IS_USER_DRAW:
      let newState_isd = Object.assign({}, prevState);
      if (action.payload !== prevState.isUserDrawChart) {
        newState_isd.isUserDrawChart = action.payload;
      }
      return newState_isd;

    case constant.DIST_IS_USER_GENERATE_MATRIX:
      let newState_iugm = Object.assign({}, prevState);
      if (action.payload !== prevState.isUserGenerateMatrix) {
        newState_iugm.isUserGenerateMatrix = action.payload;
      }
      return newState_iugm;

    case constant.DIST_IS_USER_EXPORT:
      let newState_iue = Object.assign({}, prevState);
      if (action.payload !== prevState.isUserExportSnpDist) {
        newState_iue.isUserExportSnpDist = action.payload;
      }
      return newState_iue;

    case constant.DIST_CHART_SESSION:
      let newState_dcs = Object.assign({}, prevState);
      if (action.payload !== prevState.chartSession) {
        newState_dcs.chartSession = action.payload;
      }
      return newState_dcs;

    case constant.DIST_IS_USER_LOAD_SESSION:
      let newState_iuls = Object.assign({}, prevState);
      if (action.payload !== prevState.isUserReloadSession) {
        newState_iuls.isUserReloadSession = action.payload;
      }
      return newState_iuls;

    case constant.DIST_IS_MODAL_OPEN:
      let newState_imo = Object.assign({}, prevState);
      if (action.payload !== prevState.isModalOpen) {
        newState_imo.isModalOpen = action.payload;
      }
      return newState_imo;

    default:
      if (prevState) {
        return prevState;
      } else {
        return initialState.snpDistSettings;
      }
  }
};

export default snpDistSettingsReducer;
