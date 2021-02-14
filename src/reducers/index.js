import { combineReducers } from "redux";
import sequenceReducer from "./sequenceReducer";
import navSettingsReducer from "./navSettingsReducer";
import graphSettingsReducer from "./graphSettingsReducer";
import metadataReducer from "./metadataReducer";
import patientMovementReducer from "./patientMovementReducer";
import isInputLoadingReducer from "./isInputLoadingReducer";
import graphObjectReducer from "./graphObjectReducer";
import graphClustersReducer from "./graphClustersReducer";
import hammMatrixReducer from "./hammMatrixReducer";
import categoricalMapReducer from "./categoricalMapReducer";
import colorLUTReducer from "./colorLUTReducer";
import snpDistSettingsReducer from "./snpDistSettingsReducer";

export const initialState = {
  sequence: null,
  metadata: null,
  categoricalMap: null,
  patientMovement: null,
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
    isEdgeScaled: false,
    edgeScaleFactor: 1,
    isHideEdgesByCutoff: false,
    hiddenEdgesCutoff: 0,
    colorNodedBy: "na",
    exportFormat: "clusterID",
    isUserDownloading: false,
  },
  snpDistSettings: {
    dataToDisplay: "all",
    dataColumn: null,
    chartType: "violin",
    isUserGenerateMatrix: false,
    chartOrientation: "horizontal",
    isUserDrawChart: false,
    snpDistExportFormat: "svg",
    isUserExportSnpDist: false,
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
    categoricalMap: categoricalMapReducer,
    patientMovement: patientMovementReducer,
    navSettings: navSettingsReducer,
    graphSettings: graphSettingsReducer,
    hammMatrix: hammMatrixReducer,
    graphObject: graphObjectReducer,
    graphClusters: graphClustersReducer,
    isInputLoading: isInputLoadingReducer,
    colorLUT: colorLUTReducer,
    snpDistSettings: snpDistSettingsReducer,
  },
  initialState
);

export default rootReducer;
//isUserFilterEdges: { status: false, cutoff: 0 },
