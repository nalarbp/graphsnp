import React from "react";
import { Button, Row, Col, Select, InputNumber } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  changeMethodSetting,
  changeLayoutSetting,
  changeIsUserReDrawSetting,
  changeEdgeFilterCutoffSetting,
  changeClusterMethodSetting,
  changeIsUserClusteringSetting,
  changeExportFormatSetting,
  changeIsUserDownloadingSetting,
  changeColorNodeSetting,
} from "../action/graphSettingsActions";

const { Option } = Select;

const SiderMenu = (props) => {
  //STATES

  //SETTINGS
  const graph_method = props.graphSettings.method;
  const graph_layout = props.graphSettings.layout;
  const graph_isUserReDraw = props.graphSettings.isUserReDraw;
  const graph_edgeFilterCutoff = props.graphSettings.edgeFilterCutoff;
  const graph_clusterMethod = props.graphSettings.clusterMethod;
  const graph_isUserClustering = props.graphSettings.isUserClustering;
  const graph_colorNodeBy = props.graphSettings.colorNodedBy;
  const graph_exportFormat = props.graphSettings.exportFormat;
  const graph_isUserDownloading = props.graphSettings.isUserDownloading;

  //HANDLERS
  const changeMethodHandler = (val) => {
    props.changeMethodSetting(val);
  };

  const changeLayoutHandler = (val) => {
    props.changeLayoutSetting(val);
  };

  const drawingHandler = () => {
    if (!graph_isUserReDraw) {
      props.changeIsUserReDrawSetting(true);
    }
  };

  const edgeCutoffHandler = (val) => {
    if (val > 0) {
      props.changeEdgeFilterCutoffSetting(val);
    }
  };

  const changeClusterMethodHandler = (val) => {
    props.changeClusterMethodSetting(val);
  };

  const clusteringHandler = () => {
    if (!graph_isUserClustering) {
      props.changeIsUserClusteringSetting(true);
    }
  };

  const changeColorNodeHandler = (val) => {
    props.changeColorNodeSetting(val);
  };

  const changeExportFormatHandler = (val) => {
    if (!graph_isUserDownloading) {
      props.changeExportFormatSetting(val);
    }
  };
  //input list data

  const getColorOption = function (header, i) {
    return (
      <Option key={i} disabled={false} value={header}>
        {header}
      </Option>
    );
  };

  return (
    <React.Fragment>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <h5>General settings</h5>
          <p>Construction method</p>
          <Select
            value={graph_method}
            style={{ width: "100%" }}
            onChange={changeMethodHandler}
          >
            <Option value="mcg">MCG</Option>
            <Option value="cathai">CATHAI</Option>
          </Select>
        </Col>
        <Col span={24}>
          <p>Graph layout</p>
          <Select
            value={graph_layout}
            style={{ width: "100%" }}
            onChange={changeLayoutHandler}
          >
            <Option value="cose">COSE</Option>
            <Option value="circle">Circle</Option>
            <Option value="grid">Grid</Option>
            <Option value="random">Random</Option>
            <Option value="concentric">Concentric</Option>
          </Select>
        </Col>

        <Col span={24}>
          <h5>SNPs cutoff</h5>
          <InputNumber
            min={0}
            step={0.1}
            value={graph_edgeFilterCutoff}
            onChange={edgeCutoffHandler}
            style={{ marginBottom: "5px" }}
          />
        </Col>

        <Col span={24}>
          <h5>Create graph</h5>
          <Button
            danger={true}
            disabled={props.sequence ? false : true}
            onClick={drawingHandler}
          >
            Draw graph
          </Button>
        </Col>

        <Col span={24}>
          <p>Clustering method</p>
          <Select
            disabled={props.graphObject ? false : true}
            value={graph_clusterMethod}
            style={{ width: "100%" }}
            onChange={changeClusterMethodHandler}
          >
            <Option value="Connected Components">Connected Components</Option>
            <Option value="Louvain">Louvain</Option>
          </Select>
        </Col>

        <Col span={24}>
          <Button
            disabled={props.graphObject ? false : true}
            onClick={clusteringHandler}
          >
            Find clusters
          </Button>
        </Col>

        <Col span={24}>
          <h5>Color nodes by</h5>
          <Select
            value={graph_colorNodeBy}
            style={{ width: "100%" }}
            onChange={changeColorNodeHandler}
          >
            {" "}
            {props.colorLUT && Object.keys(props.colorLUT)
              ? Object.keys(props.colorLUT).map((k, i) => {
                  return getColorOption(k, i);
                })
              : ["na"].map((l, j) => {
                  return getColorOption(l, j);
                })}
          </Select>
        </Col>

        <Col span={24}>
          <h5>Export settings</h5>
          <p>Graph format</p>
          <Select
            value={graph_exportFormat}
            style={{ width: "100%" }}
            onChange={changeExportFormatHandler}
          >
            <Option value="dot">DOT</Option>
            <Option value="edgeList">Edge List</Option>
            <Option value="grapml">Graph ML</Option>
          </Select>
        </Col>
        <Col span={24}>
          <Button onClick={drawingHandler}>Export graph</Button>
        </Col>
      </Row>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    metadata: state.metadata,
    phyloTimeTree: state.phyloTimeTree,
    sequence: state.sequence,
    graphSettings: state.graphSettings,
    graphObject: state.graphObject,
    graphClusters: state.graphClusters,
    colorLUT: state.colorLUT,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeMethodSetting,
      changeLayoutSetting,
      changeIsUserReDrawSetting,
      changeEdgeFilterCutoffSetting,
      changeClusterMethodSetting,
      changeIsUserClusteringSetting,
      changeColorNodeSetting,
      changeExportFormatSetting,
      changeIsUserDownloadingSetting,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SiderMenu);

/*

*/
