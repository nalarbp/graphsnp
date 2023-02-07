import { combineReducers } from "redux";
import { GENERAL_RESET } from "../utils/constants";
import categoricalMapReducer from "./categoricalMapReducer";
import chartsDataReducer from "./chartsDataReducer";
import colorLUTReducer from "./colorLUTReducer";
import graphClustersReducer from "./graphClustersReducer";
import graphObjectReducer from "./graphObjectReducer";
import graphSettingsReducer from "./graphSettingsReducer";
import hammMatrixReducer from "./hammMatrixReducer";
import isInputLoadingReducer from "./isInputLoadingReducer";
import isShowingLoadingModalReducer from "./isShowingLoadingModalReducer";
import metadataReducer from "./metadataReducer";
import navSettingsReducer from "./navSettingsReducer";
import projectsReducer from "./projectsReducer";
import selectDemoDataReducer from "./selectDemoDataReducer";
import selectedNodeReducer from "./selectedNodeReducer";
import sequenceReducer from "./sequenceReducer";
import snpDistSettingsReducer from "./snpDistSettingsReducer";

export const initialState = {
  projectJSON: null,
  sequence: null,
  metadata: null,
  selectDemoData: null,
  categoricalMap: null,
  isInputLoading: false,
  hammMatrix: null,
  graphObject: null,
  graphClusters: null,
  selectedNode: [],
  graphSettings: {
    typeOfAnalysis: "clustering",
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
    chartSession: null,
    isUserReloadSession: false,
    isUserRelayout: false,
    node_isLabelShown: true,
    node_size: 5,
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
    isModalOpen: { visible: false, chartSettings: null, chartType: null },
  },
  chartsData: {
    allDistData: null,
    allDistStats: null,
    groupPieData: null,
    groupDistStats: null,
    groupDistIntraInter: null,
  },
  navSettings: {
    navLocation: null,
  },
  colorLUT: null,
  isShowingLoadingModal: false,
};

const rootReducer = (state, action) => {
  if (action.type === GENERAL_RESET) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const appReducer = combineReducers(
  {
    projectJSON: projectsReducer,
    sequence: sequenceReducer,
    metadata: metadataReducer,
    selectDemoData: selectDemoDataReducer,
    categoricalMap: categoricalMapReducer,
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
    chartsData: chartsDataReducer,
  },
  initialState
);

export default rootReducer;
