import { initialState } from ".";
import * as constant from "../utils/constants";

const graphSettingsReducer = (prevState, action) => {
  switch (action.type) {
    case constant.SETTING_METHOD:
      let newState_method = Object.assign({}, prevState);
      if (action.payload && action.payload !== prevState.method) {
        newState_method.method = action.payload;
      }
      return newState_method; // if no change return same state with before

    case constant.SETTING_LAYOUT:
      let newState_layout = Object.assign({}, prevState);
      if (action.payload && action.payload !== prevState.layout) {
        newState_layout.layout = action.payload;
      }
      return newState_layout;

    case constant.SETTING_IS_USER_REDRAW:
      let newState_isUserReDraw = Object.assign({}, prevState);
      if (action.payload !== prevState.isUserReDraw) {
        newState_isUserReDraw.isUserReDraw = action.payload;
      }
      return newState_isUserReDraw;

    case constant.SETTING_EDGE_FILTER_CUTOFF:
      let newState_efc = Object.assign({}, prevState);
      if (action.payload && action.payload !== prevState.edgeFilterCutoff) {
        newState_efc.edgeFilterCutoff = action.payload;
      }
      return newState_efc;

    case constant.SETTING_IS_USER_FILTER_EDGES:
      let newState_isUserFilterEdges = Object.assign({}, prevState);
      if (action.payload !== prevState.isUserFilterEdges) {
        newState_isUserFilterEdges.isUserFilterEdges = action.payload;
      }
      return newState_isUserFilterEdges;

    case constant.SETTING_CLUSTER_METHOD:
      let newState_cm = Object.assign({}, prevState);
      if (action.payload && action.payload !== prevState.clusterMethod) {
        newState_cm.clusterMethod = action.payload;
      }
      return newState_cm;

    case constant.SETTING_IS_USER_CLUSTERING:
      let newState_isUseClustering = Object.assign({}, prevState);
      if (action.payload !== prevState.isUserClustering) {
        newState_isUseClustering.isUserClustering = action.payload;
      }
      return newState_isUseClustering;

    case constant.SETTING_IS_EDGE_SCALED:
      let newState_isEdgeScaled = Object.assign({}, prevState);
      if (action.payload !== prevState.isEdgeScaled) {
        newState_isEdgeScaled.isEdgeScaled = action.payload;
      }
      return newState_isEdgeScaled;

    case constant.SETTING_EDGE_SCALE_FACTOR:
      let newState_scaleFactor = Object.assign({}, prevState);
      if (action.payload !== prevState.edgeScaleFactor) {
        newState_scaleFactor.edgeScaleFactor = action.payload;
      }
      return newState_scaleFactor;

    case constant.SETTING_IS_HIDE_EDGES:
      let newState_ihe = Object.assign({}, prevState);
      if (action.payload !== prevState.isHideEdgesByCutoff) {
        newState_ihe.isHideEdgesByCutoff = action.payload;
      }
      return newState_ihe;

    case constant.SETTING_EDGE_HIDE_CUTOFF:
      let newState_ehc = Object.assign({}, prevState);
      if (action.payload !== prevState.hiddenEdgesCutoff) {
        newState_ehc.hiddenEdgesCutoff = action.payload;
      }
      return newState_ehc;

    case constant.SETTING_COLOR_NODE_BY:
      let newState_colorNode = Object.assign({}, prevState);
      if (action.payload && action.payload !== prevState.colorNodedBy) {
        newState_colorNode.colorNodedBy = action.payload;
      }
      return newState_colorNode;

    case constant.SETTING_EXPORT_FORMAT:
      let newState_exportFormat = Object.assign({}, prevState);
      if (action.payload && action.payload !== prevState.exportFormat) {
        newState_exportFormat.exportFormat = action.payload;
      }
      return newState_exportFormat;

    case constant.SETTING_IS_USER_DOWNLOADING:
      let newState_isUserDownloading = Object.assign({}, prevState);
      if (action.payload !== prevState.isUserDownloading) {
        newState_isUserDownloading.isUserDownloading = action.payload;
      }
      return newState_isUserDownloading;

    case constant.SETTING_TRANS_LOC_LEVEL:
      let newState_transLocLevel = Object.assign({}, prevState);
      if (action.payload && action.payload !== prevState.transIncludeLocLevel) {
        newState_transLocLevel.transIncludeLocLevel = action.payload;
      }
      return newState_transLocLevel;

    default:
      if (prevState) {
        return prevState;
      } else {
        return initialState.graphSettings;
      }
  }
};

export default graphSettingsReducer;
