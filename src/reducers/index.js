import { combineReducers } from "redux";
import categoricalMapReducer from "./categoricalMapReducer";
import colorLUTReducer from "./colorLUTReducer";
import graphClustersReducer from "./graphClustersReducer";
import graphObjectReducer from "./graphObjectReducer";
import graphSettingsReducer from "./graphSettingsReducer";
import hammMatrixReducer from "./hammMatrixReducer";
import isInputLoadingReducer from "./isInputLoadingReducer";
import isShowingLoadingModalReducer from "./isShowingLoadingModalReducer";
import metadataReducer from "./metadataReducer";
import navSettingsReducer from "./navSettingsReducer";
import patientMovementReducer from "./patientMovementReducer";
import projectsReducer from "./projectsReducer";
import selectDemoDataReducer from "./selectDemoDataReducer";
import selectedNodeReducer from "./selectedNodeReducer";
import sequenceReducer from "./sequenceReducer";
import snpDistSettingsReducer from "./snpDistSettingsReducer";

export const initialState = {
  projectJSON: null,
  sequence: null,
  metadata: null,
  patientMovement: null,
  selectDemoData: null,
  categoricalMap: null,
  isInputLoading: false,
  hammMatrix: null,
  graphObject: null,
  graphClusters: null,
  selectedNode: [], //exception, reducers and action were on
  graphSettings: {
    typeOfAnalysis: "clustering", //clustering;transmission
    method: "mscg",
    layout: "cose-bilkent",
    isUserReDraw: false,
    isUserFilteringEdge: true,
    edgeFilterCutoff: 25,
    clusterMethod: "Connected Components",
    isUserClustering: false,
    isEdgeScaled: false,
    edgeScaleFactor: 1,
    isHideEdgesByCutoff: false,
    hiddenEdgesCutoff: { min: 0, max: 25 },
    colorNodedBy: "na",
    exportFormat: "clusterID",
    isUserDownloading: false,
    transIncludeLocLevel: 1,
    chartSession: null,
    isUserReloadSession: false,
    isUserRelayout: false,
    node_isLabelShown: true, //mean show it
    edge_labelSize: 3,
  },
  snpDistSettings: {
    dataToDisplay: "all",
    dataColumn: null,
    dataColumnLevel: null,
    chartType: "barplot",
    isUserGenerateMatrix: false,
    chartOrientation: "horizontal",
    isUserDrawChart: false,
    snpDistExportFormat: "symSnpDist",
    isUserExportSnpDist: false,
    chartSession: null,
    isUserReloadSession: false,
    chartsData: null,
  },
  navSettings: {
    navLocation: null,
  },
  colorLUT: null,
  isShowingLoadingModal: false,
};
const rootReducer = combineReducers(
  {
    projectJSON: projectsReducer,
    sequence: sequenceReducer,
    metadata: metadataReducer,
    selectDemoData: selectDemoDataReducer,
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
    selectedNode: selectedNodeReducer,
    isShowingLoadingModal: isShowingLoadingModalReducer,
  },
  initialState
);

export default rootReducer;
//isUserFilterEdges: { status: false, cutoff: 0 },
