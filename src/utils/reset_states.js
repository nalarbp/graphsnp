import * as graphMatrixActions from "../action/graphMatrixActions";
import * as graphSettingsActions from "../action/graphSettingsActions";
import * as snpDistSettingsActions from "../action/snpdistSettingsActions";
import { initialState } from "../reducers/index";
//import * as inputActions from "../action/inputActions";
//import { resetStore } from "../action/generalActions";
//import isShowingLoadingModalToStore from "../action/isShowingLoadingModalActions";
//import { changeNavLocation } from "../action/navigationActions";

function resetGraphObjects() {
  //doesnt work, why?
  graphMatrixActions.hmmMatrixToStore(initialState.hammMatrix);
  graphMatrixActions.graphObjectToStore(initialState.graphObject);
  graphMatrixActions.graphClusterToStore(initialState.graphClusters);
}

function resetGraphSettings() {
  graphSettingsActions.changeMethodSetting(initialState.graphSettings.method);
  graphSettingsActions.changeLayoutSetting(initialState.graphSettings.layout);
  graphSettingsActions.changeEdgeFilterCutoffSetting(
    initialState.graphSettings.edgeFilterCutoff
  );
  graphSettingsActions.changeIsUserFilterEdgesSetting(
    initialState.graphSettings.isUserFilteringEdge
  );
  graphSettingsActions.changeClusterMethodSetting(
    initialState.graphSettings.clusterMethod
  );
  graphSettingsActions.changeIsEdgeScaledSetting(
    initialState.graphSettings.isEdgeScaled
  );
  graphSettingsActions.changeEdgeScaleFactorSetting(
    initialState.graphSettings.edgeScaleFactor
  );
  graphSettingsActions.changeIsHideEdgesByCutoff(
    initialState.graphSettings.isHideEdgesByCutoff
  );
  graphSettingsActions.changeEdgesHideCutoff(
    initialState.graphSettings.hiddenEdgesCutoff
  );
  graphSettingsActions.changeColorNodeSetting(
    initialState.graphSettings.colorNodedBy
  );
  graphSettingsActions.changeExportFormatSetting(
    initialState.graphSettings.exportFormat
  );
  graphSettingsActions.changeTypeOfAnalysisSetting(
    initialState.graphSettings.typeOfAnalysis
  );
  graphSettingsActions.changeChartSessionSetting(
    initialState.graphSettings.chartSession
  );
  graphSettingsActions.changeSelectedNode(
    initialState.graphSettings.isUserReloadSession
  );
  graphSettingsActions.changeNodeIsLabelShown(
    initialState.graphSettings.node_isLabelShown
  );
  graphSettingsActions.changeEdgeLabelSizeSetting(
    initialState.graphSettings.edge_labelSize
  );
}

function resetSnpDistSettings() {
  //reset snpDist input related settings
  snpDistSettingsActions.dist_changeDataToDisplay(
    initialState.snpDistSettings.dataToDisplay
  );
  snpDistSettingsActions.dist_changeDataColumn(
    initialState.snpDistSettings.dataColumn
  );
  snpDistSettingsActions.dist_changeDataColumnLevel(
    initialState.snpDistSettings.dataColumnLevel
  );
  snpDistSettingsActions.dist_changeExportFormat(
    initialState.snpDistSettings.snpDistExportFormat
  );
  snpDistSettingsActions.dist_changeChartSession(
    initialState.snpDistSettings.chartSession
  );
  snpDistSettingsActions.dist_changeChartsData(
    initialState.snpDistSettings.chartsData
  );
}

export function resetDistanceInputRelatedStates() {
  //resetGraphObjects();
  resetGraphSettings();
  resetSnpDistSettings();
}

export function resetMetadataInputRelatedStates() {
  resetGraphSettings();
  resetSnpDistSettings();
}
