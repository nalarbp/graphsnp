import { combineReducers } from "redux";
import sequenceReducer from "./sequenceReducer";
import navSettingsReducer from "./navSettingsReducer";
import graphSettingsReducer from "./graphSettingsReducer";
import metadataReducer from "./metadataReducer";
import phyloTimeTreeReducer from "./phyloTimeTreeReducer";
import isInputLoadingReducer from "./isInputLoadingReducer";
import graphObjectReducer from "./graphObjectReducer";
import graphClustersReducer from "./graphClustersReducer";
import hammMatrixReducer from "./hammMatrixReducer";
import colorLUTReducer from "./colorLUTReducer";

export const initialState = {
  sequence: null,
  metadata: null,
  phyloTimeTree: null,
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
  colorLUT: null,
};
const rootReducer = combineReducers(
  {
    sequence: sequenceReducer,
    metadata: metadataReducer,
    phyloTimeTree: phyloTimeTreeReducer,
    navSettings: navSettingsReducer,
    graphSettings: graphSettingsReducer,
    hammMatrix: hammMatrixReducer,
    graphObject: graphObjectReducer,
    graphClusters: graphClustersReducer,
    isInputLoading: isInputLoadingReducer,
    colorLUT: colorLUTReducer,
  },
  initialState
);

export default rootReducer;
//isUserFilterEdges: { status: false, cutoff: 0 },
