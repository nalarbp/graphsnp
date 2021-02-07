import React from "react";
import { Button, Row, Col, Select, InputNumber, Checkbox, Divider } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createClusterCSVFile } from "../utils/create_exportFile";
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
  changeIsEdgeScaledSetting,
  changeEdgeScaleFactorSetting,
  changeIsHideEdgesByCutoff,
  changeEdgesHideCutoff,
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
  const graph_isEdgeScaled = props.graphSettings.isEdgeScaled;
  const graph_edgeScaleFactor = props.graphSettings.edgeScaleFactor;
  const graph_isEdgesHideByCutoff = props.graphSettings.isHideEdgesByCutoff;
  const graph_edgesHideCutoff = props.graphSettings.hiddenEdgesCutoff;
  const graph_colorNodeBy = props.graphSettings.colorNodedBy;
  const graph_exportFormat = props.graphSettings.exportFormat;

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
    props.changeExportFormatSetting(val);
  };

  const isEdgeScaledHandler = (e) => {
    let isChecked = e.target.checked;
    props.changeIsEdgeScaledSetting(isChecked);
  };

  const edgeScaleFactorHandler = (val) => {
    if (val > 0) {
      props.changeEdgeScaleFactorSetting(val);
    }
  };

  const isEdgeHideByCutoffHandler = (e) => {
    let isChecked = e.target.checked;
    props.changeIsHideEdgesByCutoff(isChecked);
  };

  const edgesHideCutoffHandler = (val) => {
    if (val > 0) {
      props.changeEdgesHideCutoff(val);
    }
  };

  const exportingHandler = () => {
    switch (graph_exportFormat) {
      case "clusterID":
        createClusterCSVFile(props.graphClusters.members);
        break;

      default:
        break;
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
          <h5>Graph settings</h5>
          <p>Construction method</p>
          <Select
            disabled={props.sequence ? false : true}
            value={graph_method}
            style={{ width: "100%" }}
            onChange={changeMethodHandler}
          >
            <Option value="mcg">MCG</Option>
            <Option
              disabled={props.sequence && props.metadata ? false : true}
              value="cge"
            >
              MCG + metadata
            </Option>
            <Option value="cathai">CATHAI</Option>
          </Select>
        </Col>
        <Col span={24}>
          <p>Graph layout</p>
          <Select
            disabled={props.sequence ? false : true}
            value={graph_layout}
            style={{ width: "100%" }}
            onChange={changeLayoutHandler}
          >
            <Option value="cose">CoSE</Option>
            <Option value="spread">Spread</Option>
            <Option value="fcose">fCoSE</Option>
            <Option value="random">Random</Option>
            <Option value="concentric">Concentric</Option>
          </Select>
        </Col>

        <Col span={24}>
          <p>SNPs cutoff</p>
          <InputNumber
            min={0}
            disabled={props.sequence ? false : true}
            step={1}
            value={graph_edgeFilterCutoff}
            onChange={edgeCutoffHandler}
            style={{ marginBottom: "5px" }}
          />
        </Col>

        <Col span={24}>
          <Button
            danger={true}
            disabled={props.sequence ? false : true}
            onClick={drawingHandler}
          >
            Draw graph
          </Button>
        </Col>

        <Divider style={{ margin: "10px 0px 0px 0px" }} />

        <Col span={24}>
          <h5>Cluster Settings</h5>
          <p>Clustering method </p>
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

        <Divider style={{ margin: "10px 0px 0px 0px" }} />

        <Col span={24}>
          <h5>Visualization settings</h5>
          <Checkbox
            style={{ fontSize: "10px" }}
            onChange={isEdgeScaledHandler}
            checked={graph_isEdgeScaled}
            disabled={props.graphObject ? false : true}
          >
            Scale edge to weight
          </Checkbox>
        </Col>
        <Col span={24}>
          <p>Scale factor</p>
          <InputNumber
            min={0.00001}
            disabled={props.graphObject ? false : true}
            step={0.1}
            value={graph_edgeScaleFactor}
            onChange={edgeScaleFactorHandler}
          />
        </Col>

        <Col span={24}>
          <Checkbox
            style={{ fontSize: "10px" }}
            onChange={isEdgeHideByCutoffHandler}
            checked={graph_isEdgesHideByCutoff}
            disabled={props.graphObject ? false : true}
          >
            Hide some edges
          </Checkbox>
        </Col>
        <Col span={24}>
          <p>Cutoff to hide the edges</p>
          <InputNumber
            min={0}
            disabled={props.graphObject ? false : true}
            step={0.1}
            value={graph_edgesHideCutoff}
            onChange={edgesHideCutoffHandler}
          />
        </Col>

        <Col span={24}>
          <p>Color nodes by</p>
          <Select
            disabled={props.graphObject ? false : true}
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
          <p>Download format</p>
          <Select
            disabled={props.graphClusters ? false : true}
            value={graph_exportFormat}
            style={{ width: "100%" }}
            onChange={changeExportFormatHandler}
          >
            <Option disabled={true} value="dot">
              Graph (DOT)
            </Option>
            <Option disabled={true} value="edgeList">
              Graph (Edge List)
            </Option>
            <Option disabled={true} value="svg">
              Graph (SVG)
            </Option>
            <Option
              disabled={props.graphClusters ? false : true}
              value="clusterID"
            >
              Cluster IDs (CSV)
            </Option>
          </Select>
        </Col>
        <Col span={24}>
          <Button
            disabled={props.graphClusters ? false : true}
            onClick={exportingHandler}
          >
            Download
          </Button>
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
      changeIsEdgeScaledSetting,
      changeEdgeScaleFactorSetting,
      changeColorNodeSetting,
      changeExportFormatSetting,
      changeIsUserDownloadingSetting,
      changeIsHideEdgesByCutoff,
      changeEdgesHideCutoff,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SiderMenu);

/*

*/
