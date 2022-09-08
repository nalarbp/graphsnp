import { initialState } from ".";
import * as constant from "../utils/constants";

const chartsDataReducer = (prevState, action) => {
  switch (action.type) {
    case constant.CHART_ALL_DIST:
      let newState_cad = Object.assign({}, prevState);
      if (action.payload !== prevState.allDistData) {
        newState_cad.allDistData = action.payload;
      }
      return newState_cad; // if no change return same state with before

    case constant.CHART_ALL_STATS:
      let newState_cas = Object.assign({}, prevState);
      if (action.payload !== prevState.allDistStats) {
        newState_cas.allDistStats = action.payload;
      }
      return newState_cas;

    case constant.CHART_GROUP_PIE:
      let newState_cgp = Object.assign({}, prevState);
      if (action.payload !== prevState.groupPieData) {
        newState_cgp.groupPieData = action.payload;
      }
      return newState_cgp;

    case constant.CHART_GROUP_STATS:
      let newState_cgs = Object.assign({}, prevState);
      if (action.payload !== prevState.groupDistStats) {
        newState_cgs.groupDistStats = action.payload;
      }
      return newState_cgs;

    case constant.CHART_GROUP_INTRA_INTER:
      let newState_cgae = Object.assign({}, prevState);
      if (action.payload !== prevState.groupDistIntraInter) {
        newState_cgae.groupDistIntraInter = action.payload;
      }
      return newState_cgae;

    default:
      if (prevState) {
        return prevState;
      } else {
        return initialState.chartsData;
      }
  }
};

export default chartsDataReducer;
