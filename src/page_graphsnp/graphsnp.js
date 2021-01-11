import React from "react";
import { Layout } from "antd";
import "./style_graphsnp.css";
import { connect } from "react-redux";
//import { Link, NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import { changeNavLocation } from "../action/navigationActions";
import {
  changeIsUserReDrawSetting,
  changeMethodSetting,
  changeLayoutSetting,
  changeExportFormatSetting,
  changeIsUserDownloadingSetting,
  changeIsUserFilterEdgesSetting,
} from "../action/graphSettingsActions";
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
            changeIsUserReDrawSetting={props.changeIsUserReDrawSetting}
            changeMethodSetting={props.changeMethodSetting}
            changeLayoutSetting={props.changeLayoutSetting}
            changeExportFormatSetting={props.changeExportFormatSetting}
            changeIsUserFilterEdgesSetting={
              props.changeIsUserFilterEdgesSetting
            }
            changeIsUserDownloadingSetting={
              props.changeIsUserDownloadingSetting
            }
          />
        </Sider>
        <Layout>
          <Content id="graphsnp-container">
            <GraphContainer
              sequence={props.sequence}
              collectionDates={props.collectionDates}
              exposurePeriod={props.exposurePeriod}
              graphSettings={props.graphSettings}
              changeIsUserReDrawSetting={props.changeIsUserReDrawSetting}
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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeNavLocation: changeNavLocation,
      changeIsUserReDrawSetting: changeIsUserReDrawSetting,
      changeMethodSetting: changeMethodSetting,
      changeLayoutSetting: changeLayoutSetting,
      changeExportFormatSetting: changeExportFormatSetting,
      changeIsUserDownloadingSetting: changeIsUserDownloadingSetting,
      changeIsUserFilterEdgesSetting: changeIsUserFilterEdgesSetting,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphSNP);
