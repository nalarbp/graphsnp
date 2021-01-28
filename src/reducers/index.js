import { combineReducers } from "redux";
import sequenceReducer from "./sequenceReducer";
import navSettingsReducer from "./navSettingsReducer";
import graphSettingsReducer from "./graphSettingsReducer";
import collectionDatesReducer from "./collectionDatesReducer";
import exposurePeriodReducer from "./exposurePeriodReducer";
import isInputLoadingReducer from "./isInputLoadingReducer";
import graphMatrixReducer from "./graphMatrixReducer";
import prevGraphReducer from "./prevGraphReducer";

export const initialState = {
  sequence: null,
  collectionDates: null,
  exposurePeriod: null,
  isInputLoading: false,
  graphMatrix: {
    type: null,
    data: null,
  },
  prevGraph: null,
  graphSettings: {
    method: "mcg",
    layout: "cose",
    isUserReDraw: false,
    isUserFilteringEdge: false,
    edgeFilterCutoff: 0.1,
    clusterMethod: "optimal",
    isUserClustering: false,
    exportFormat: "dot",
    isUserDownloading: false,
  },
  navSettings: {
    navLocation: null,
  },
};
const rootReducer = combineReducers(
  {
    sequence: sequenceReducer,
    collectionDates: collectionDatesReducer,
    exposurePeriod: exposurePeriodReducer,
    navSettings: navSettingsReducer,
    graphSettings: graphSettingsReducer,
    graphMatrix: graphMatrixReducer,
    prevGraph: prevGraphReducer,
    isInputLoading: isInputLoadingReducer,
  },
  initialState
);

export default rootReducer;
//isUserFilterEdges: { status: false, cutoff: 0 },
