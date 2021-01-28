import React from "react";
import { Layout } from "antd";
import "./style_graphsnp.css";
import { connect } from "react-redux";
//import { Link, NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import { changeNavLocation } from "../action/navigationActions";
import { prevGraphToStore } from "../action/prevGraphActions";
import { graphMatrixToStore } from "../action/graphMatrixActions";
import * as settingsAction from "../action/graphSettingsActions";

import SiderMenu from "./comp_sider";
import GraphContainer from "./comp_graphContainer";

const { Sider, Content } = Layout;

const GraphSNP = (props) => {
  //console.log("page-graph-init");
  return (
    <React.Fragment>
      <Layout>
        <Sider id="graphsnp-sider">
          <SiderMenu
            sequence={props.sequence}
            collectionDates={props.collectionDates}
            exposurePeriod={props.exposurePeriod}
            graphSettings={props.graphSettings}
            changeMethodSetting={props.changeMethodSetting}
            changeLayoutSetting={props.changeLayoutSetting}
            changeIsUserReDrawSetting={props.changeIsUserReDrawSetting}
            changeEdgeFilterCutoffSetting={props.changeEdgeFilterCutoffSetting}
            changeIsUserFilterEdgesSetting={
              props.changeIsUserFilterEdgesSetting
            }
            changeClusterMethodSetting={props.changeClusterMethodSetting}
            changeIsUserClusteringSetting={props.changeIsUserClusteringSetting}
            changeExportFormatSetting={props.changeExportFormatSetting}
            changeIsUserDownloadingSetting={
              props.changeIsUserDownloadingSetting
            }
          />
        </Sider>
        <Layout>
          <Content id="graphsnp-container">
            <GraphContainer
              prevGraph={props.prevGraph}
              sequence={props.sequence}
              collectionDates={props.collectionDates}
              exposurePeriod={props.exposurePeriod}
              graphSettings={props.graphSettings}
              graphMatrixToStore={props.graphMatrixToStore}
              changeIsUserReDrawSetting={props.changeIsUserReDrawSetting}
              prevGraphToStore={props.prevGraphToStore}
              changeIsUserFilterEdgesSetting={
                props.changeIsUserFilterEdgesSetting
              }
            />
          </Content>
        </Layout>
      </Layout>
    </React.Fragment>
  );
};
function mapStateToProps(state) {
  return {
    collectionDates: state.collectionDates,
    exposurePeriod: state.exposurePeriod,
    sequence: state.sequence,
    graphSettings: state.graphSettings,
    prevGraph: state.prevGraph,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeNavLocation: changeNavLocation,
      changeMethodSetting: settingsAction.changeMethodSetting,
      changeLayoutSetting: settingsAction.changeLayoutSetting,
      changeIsUserReDrawSetting: settingsAction.changeIsUserReDrawSetting,
      changeEdgeFilterCutoffSetting:
        settingsAction.changeEdgeFilterCutoffSetting,
      changeIsUserFilterEdgesSetting:
        settingsAction.changeIsUserFilterEdgesSetting,
      changeClusterMethodSetting: settingsAction.changeClusterMethodSetting,
      changeIsUserClusteringSetting:
        settingsAction.changeIsUserClusteringSetting,
      changeExportFormatSetting: settingsAction.changeExportFormatSetting,
      changeIsUserDownloadingSetting:
        settingsAction.changeIsUserDownloadingSetting,
      graphMatrixToStore: graphMatrixToStore,
      prevGraphToStore: prevGraphToStore,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphSNP);
