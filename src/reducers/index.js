import { combineReducers } from "redux";
import sequenceReducer from "./sequenceReducer";
import navSettingsReducer from "./navSettingsReducer";
import graphSettingsReducer from "./graphSettingsReducer";
import collectionDatesReducer from "./collectionDatesReducer";
import exposurePeriodReducer from "./exposurePeriodReducer";
import isInputLoadingReducer from "./isInputLoadingReducer";
import graphObjectReducer from "./graphObjectReducer";
import graphClustersReducer from "./graphClustersReducer";
import hammMatrixReducer from "./hammMatrixReducer";

export const initialState = {
  sequence: null,
  collectionDates: null,
  exposurePeriod: null,
  isInputLoading: false,
  hammMatrix: null,
  graphObject: null,
  graphClusters: null,
  graphSettings: {
    method: "mcg",
    layout: "cose",
    isUserReDraw: false,
    isUserFilteringEdge: false,
    edgeFilterCutoff: 25,
    clusterMethod: "Connected Components",
    isUserClustering: false,
    colorNodedBy: "na",
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
    hammMatrix: hammMatrixReducer,
    graphObject: graphObjectReducer,
    graphClusters: graphClustersReducer,
    isInputLoading: isInputLoadingReducer,
  },
  initialState
);

export default rootReducer;
//isUserFilterEdges: { status: false, cutoff: 0 },
