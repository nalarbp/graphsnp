import {
  LoadingOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  InputNumber,
  Modal,
  Row,
  Select,
  Slider,
  Spin,
  Tooltip,
} from "antd";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { isinputLoadingToStore } from "../action/inputActions";
import {
  createClusterCSVFile,
  createDOTGraph,
} from "../utils/create_exportFile";

import {
  changeClusterMethodSetting,
  changeColorNodeSetting,
  changeEdgeFilterCutoffSetting,
  changeEdgeLabelSizeSetting,
  changeEdgeScaleFactorSetting,
  changeEdgesHideCutoff,
  changeExportFormatSetting,
  changeIsEdgeScaledSetting,
  changeIsHideEdgesByCutoff,
  changeIsUserClusteringSetting,
  changeIsUserDownloadingSetting,
  changeIsUserFilterEdgesSetting,
  changeIsUserReDrawSetting,
  changeIsUserRelayoutSetting,
  changeLayoutSetting,
  changeMethodSetting,
  changeNodeIsLabelShown,
  changeNodeSizeSetting,
  changeSelectedNode,
  changeTransIcludeLocLevel,
  changeTypeOfAnalysisSetting,
} from "../action/graphSettingsActions";
import isShowingLoadingModalToStore from "../action/isShowingLoadingModalActions";
import SelectDemoData from "../page_home/comp_selectDemoData";

const { Option } = Select;
const loadingIcon = <LoadingOutlined style={{ fontSize: 34 }} spin />;

const SiderMenu = (props) => {
  //SETTINGS
  const graph_method = props.graphSettings.method;
  const graph_layout = props.graphSettings.layout;
  const graph_isUserReDraw = props.graphSettings.isUserReDraw;
  const graph_isUserFilterEdges = props.graphSettings.isUserFilteringEdge;
  const graph_edgeFilterCutoff = props.graphSettings.edgeFilterCutoff;
  const graph_clusterMethod = props.graphSettings.clusterMethod;
  const graph_isUserClustering = props.graphSettings.isUserClustering;
  const graph_isEdgeScaled = props.graphSettings.isEdgeScaled;
  const graph_edgeScaleFactor = props.graphSettings.edgeScaleFactor;
  const graph_isEdgesHideByCutoff = props.graphSettings.isHideEdgesByCutoff;
  const graph_edgesHideCutoff = props.graphSettings.hiddenEdgesCutoff;
  const graph_colorNodeBy = props.graphSettings.colorNodedBy;
  const graph_exportFormat = props.graphSettings.exportFormat;
  const graph_typeOfAnalysis = props.graphSettings.typeOfAnalysis;
  const graph_isUserRelayout = props.graphSettings.isUserRelayout;
  const graph_node_isLabelShown = props.graphSettings.node_isLabelShown;
  let graph_nodeID_options = [];

  //get nodeIDs from hamming matrix
  if (props.hammMatrix) {
    props.hammMatrix.forEach((v, k) => {
      graph_nodeID_options.push(<Option key={k}>{k}</Option>);
    });
  }

  //HANDLERS
  const changeTypeOfAnalysisHandler = (val) => {
    if (val === "clustering") {
      props.changeMethodSetting("cathai");
    } else {
      props.changeMethodSetting("seqtrack");
    }
    props.changeTypeOfAnalysisSetting(val);
  };

  const changeMethodHandler = (val) => {
    if (val === "mscg") {
      props.changeLayoutSetting("cose-bilkent");
    } else {
      props.changeLayoutSetting("cose");
    }
    props.changeMethodSetting(val);
  };

  const changeLayoutHandler = (val) => {
    if (graph_method === "mscg") {
      props.changeLayoutSetting("cose-bilkent");
    }
    props.changeLayoutSetting(val);
  };

  const reloadLayoutHandler = () => {
    if (!graph_isUserRelayout) {
      props.isShowingLoadingModalToStore(true);
      props.changeIsUserRelayoutSetting(true);
    }
  };

  const drawingHandler = () => {
    if (!graph_isUserReDraw) {
      props.isShowingLoadingModalToStore(true);
      props.changeIsUserReDrawSetting(true);
    }
  };

  const isUserFilterEdgesdHandler = (e) => {
    let isChecked = e.target.checked;
    props.changeIsUserFilterEdgesSetting(isChecked);
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

  const edgesHideCutoffMinHandler = (val) => {
    if (val >= 0) {
      let newEdgeCutoff = { min: val, max: graph_edgesHideCutoff.max };
      props.changeEdgesHideCutoff(newEdgeCutoff);
    }
  };

  const edgesHideCutoffMaxHandler = (val) => {
    if (val > 0) {
      let newEdgeCutoff = { min: graph_edgesHideCutoff.min, max: val };
      props.changeEdgesHideCutoff(newEdgeCutoff);
    }
  };

  const selectNodeIDsHandler = (val) => {
    props.changeSelectedNode(val);
  };
  const edge_labelSizeHandler = (val) => {
    props.changeEdgeLabelSizeSetting(val);
  };

  const nodeSizeHandler = (val) => {
    props.changeNodeSizeSetting(val);
  };

  const isNodeLabelShownHandler = (e) => {
    let isChecked = e.target.checked;
    props.changeNodeIsLabelShown(isChecked);
  };

  const exportingHandler = () => {
    switch (graph_exportFormat) {
      case "clusterID":
        if (props.graphClusters) {
          createClusterCSVFile(props.graphClusters.members);
        } else {
          alert("No file: Need to initiate detect cluster first ");
        }
        break;
      case "svg":
        props.changeIsUserDownloadingSetting(true);
        break;
      case "png":
        props.changeIsUserDownloadingSetting(true);
        break;
      case "dot":
        createDOTGraph(props.graphObject);
        break;

      default:
        break;
    }
  };

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
        <Col xs={24} id="modal-content">
          <Modal
            visible={props.isShowingLoadingModal}
            closable={false}
            centered={true}
            width={0}
            footer={null}
            bodyStyle={{
              textAlign: "center",
              padding: "0px",
            }}>
            <Spin
              indicator={loadingIcon}
              style={{ color: "white" }}
              tip="Preparing Graph"
              size="large"
            />
          </Modal>
        </Col>
        <Col span={24}>
          <h5>
            Select preloaded dataset{" "}
            <span>
              <Tooltip
                title="Select and visualise a preloaded dataset in the app."
                placement="rightTop">
                <QuestionCircleOutlined style={{ color: "red" }} />
              </Tooltip>
            </span>
          </h5>
          <SelectDemoData />
        </Col>

        <Col span={24}>
          <h5>Graph settings</h5>
          <p>
            Type of analysis{" "}
            <span>
              <Tooltip
                title="Analysis to be performed. Clustering: construct an undirected graph and detect putative cluster(s). Transmission: construct a directed graph to show the putative transmission flow"
                placement="rightTop">
                <QuestionCircleOutlined style={{ color: "red" }} />
              </Tooltip>
            </span>
          </p>
          <Select
            disabled={props.hammMatrix ? false : true}
            value={graph_typeOfAnalysis}
            style={{ width: "100%" }}
            onChange={changeTypeOfAnalysisHandler}>
            <Option
              disabled={props.hammMatrix ? false : true}
              value="clustering">
              {" "}
              Clustering{" "}
            </Option>
            <Option
              disabled={props.hammMatrix && props.metadata ? false : true}
              value="transmission">
              Transmission
            </Option>
          </Select>
        </Col>

        {graph_typeOfAnalysis === "clustering" && (
          <Col span={24}>
            <p>
              Method{" "}
              <span>
                <Tooltip
                  title="Method to construct clustering graph. 
                  CATHAI: given a SNP threshold, remove edges and bridges to produce the connected components (Cuddihy et al. 2022). 
                  Threshold-based MST: given a SNP threshold, detect connected components and build a minimum spanning tree (MST)"
                  placement="rightTop">
                  <QuestionCircleOutlined style={{ color: "red" }} />
                </Tooltip>
              </span>
            </p>
            <Select
              disabled={props.hammMatrix && graph_typeOfAnalysis ? false : true}
              value={graph_method}
              style={{ width: "100%" }}
              onChange={changeMethodHandler}>
              <Option value="cathai">CATHAI</Option>
              <Option
                value="mscg"
                disabled={graph_isUserFilterEdges ? false : true}>
                Threshold-based MST
              </Option>
            </Select>
          </Col>
        )}

        {graph_typeOfAnalysis === "transmission" && (
          <Col span={24}>
            <p>
              Method{" "}
              <span>
                <Tooltip
                  title="Method to construct transmission graph. 
                  SeqTrack: construct a parsimonous transmission tree based on SNP distances and sampling dates (Jombart et al. 2014)"
                  placement="rightTop">
                  <QuestionCircleOutlined style={{ color: "red" }} />
                </Tooltip>
              </span>
            </p>
            <Select
              disabled={graph_typeOfAnalysis ? false : true}
              value={graph_method}
              style={{ width: "100%" }}
              onChange={changeMethodHandler}>
              <Option
                disabled={props.hammMatrix && props.metadata ? false : true}
                value="seqtrack">
                SeqTrack
              </Option>
            </Select>
          </Col>
        )}

        <Col span={16}>
          <p>
            Layout{" "}
            <span>
              <Tooltip
                title="Layout to display the graph."
                placement="rightTop">
                <QuestionCircleOutlined style={{ color: "red" }} />
              </Tooltip>
            </span>
          </p>
          <Select
            disabled={props.hammMatrix ? false : true}
            value={graph_layout}
            style={{ width: "100%" }}
            onChange={changeLayoutHandler}>
            <Option value="cose"> CoSE</Option>
            <Option value="spread">Spread</Option>
            <Option value="fcose">fCoSE</Option>
            <Option value="cose-bilkent">CoSE Bilkent (Compound)</Option>
          </Select>
        </Col>
        <Col span={8}>
          <p>
            Refresh{" "}
            <span>
              <Tooltip
                title="Apply selected layout to current graph."
                placement="rightTop">
                <QuestionCircleOutlined style={{ color: "red" }} />
              </Tooltip>
            </span>
          </p>
          <Button
            disabled={props.graphObject ? false : true}
            onClick={reloadLayoutHandler}
            type="primary">
            <ReloadOutlined />
          </Button>
        </Col>

        <Col span={24}>
          <Checkbox
            style={{ fontSize: "10px" }}
            onChange={isUserFilterEdgesdHandler}
            checked={graph_isUserFilterEdges}
            disabled={
              props.hammMatrix && graph_typeOfAnalysis === "clustering"
                ? false
                : true
            }>
            Apply SNPs cutoff{" "}
            <span>
              <Tooltip
                title="Apply a threshold number to limit the maximum pairwise SNP distance to be displayed."
                placement="rightTop">
                <QuestionCircleOutlined style={{ color: "red" }} />
              </Tooltip>
            </span>
          </Checkbox>
        </Col>

        <Col span={24}>
          <p>
            Cutoff number{" "}
            <span>
              <Tooltip
                title="Maximum pairwise SNPs distance to be included in graph 
                  (e.g. 25 SNPs cutoff will include edges with 0 to 25 SNPs)."
                placement="rightTop">
                <QuestionCircleOutlined style={{ color: "red" }} />
              </Tooltip>
            </span>
          </p>
          <InputNumber
            min={0}
            disabled={
              graph_isUserFilterEdges &&
              props.hammMatrix &&
              graph_typeOfAnalysis === "clustering"
                ? false
                : true
            }
            step={1}
            value={graph_edgeFilterCutoff}
            onChange={edgeCutoffHandler}
            style={{ marginBottom: "5px" }}
          />
        </Col>

        <Col span={24}>
          <Button
            disabled={props.hammMatrix ? false : true}
            onClick={drawingHandler}
            type="primary">
            Create graph
          </Button>
        </Col>

        {graph_typeOfAnalysis === "clustering" && props.graphObject && (
          <Divider style={{ margin: "10px 0px 0px 0px" }} />
        )}

        {graph_typeOfAnalysis === "clustering" && props.graphObject && (
          <Col span={24}>
            <h5>Clustering settings</h5>
            <p>
              Method{" "}
              <span>
                <Tooltip
                  title="Method to detect and report cluster(s) membership of the constructed graph.
                  Connected components: using Breadth-first search algorithm (Zhou and Hansen,2006) to all connected nodes"
                  placement="rightTop">
                  <QuestionCircleOutlined style={{ color: "red" }} />
                </Tooltip>
              </span>
            </p>
            <Select
              disabled={props.graphObject ? false : true}
              value={graph_clusterMethod}
              style={{ width: "100%" }}
              onChange={changeClusterMethodHandler}>
              <Option value="Connected Components">Connected Components</Option>
            </Select>
          </Col>
        )}

        {graph_typeOfAnalysis === "clustering" && props.graphObject && (
          <Col span={24}>
            <Button
              type="primary"
              disabled={props.graphObject ? false : true}
              onClick={clusteringHandler}>
              Detect clusters
            </Button>
          </Col>
        )}

        <Divider style={{ margin: "10px 0px 0px 0px" }} />

        <h5>Node settings</h5>
        <Col span={24}>
          <p>
            Node size{" "}
            <span>
              <Tooltip title="Change node size" placement="rightTop">
                <QuestionCircleOutlined style={{ color: "red" }} />
              </Tooltip>
            </span>
          </p>
          <Slider
            value={props.graphSettings.node_size}
            min={0}
            max={100}
            onChange={nodeSizeHandler}
            disabled={props.graphObject ? false : true}
          />
        </Col>
        <Col span={24}>
          <p>
            Node color{" "}
            <span>
              <Tooltip
                title="Color nodes by the selected column in metadata or by the clustering result.
                User can also specify the color manually
                (e.g. To specify color on column 'patient_group', add new column named 'patient_group:color' in metadata)."
                placement="rightTop">
                <QuestionCircleOutlined style={{ color: "red" }} />
              </Tooltip>
            </span>
          </p>
          <Select
            disabled={props.graphObject ? false : true}
            value={graph_colorNodeBy}
            style={{ width: "100%" }}
            onChange={changeColorNodeHandler}>
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
          <p>
            Select node(s){" "}
            <span>
              <Tooltip
                title="Select one or more node IDs to highlight the node(s) on the graph"
                placement="rightTop">
                <QuestionCircleOutlined style={{ color: "red" }} />
              </Tooltip>
            </span>
          </p>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Select ID(s)"
            onChange={selectNodeIDsHandler}
            value={props.selectedNode}>
            {graph_nodeID_options}
          </Select>
        </Col>

        <Col span={24}>
          <Checkbox
            style={{ fontSize: "10px" }}
            onChange={isNodeLabelShownHandler}
            checked={graph_node_isLabelShown}
            disabled={props.graphObject ? false : true}>
            Show node label{" "}
            <span>
              <Tooltip title="Show or hide node's label." placement="rightTop">
                <QuestionCircleOutlined style={{ color: "red" }} />
              </Tooltip>
            </span>
          </Checkbox>
        </Col>

        <h5>Edge settings</h5>
        <Col span={24}>
          <p>
            Edge label size{" "}
            <span>
              <Tooltip title="Change edge label size" placement="rightTop">
                <QuestionCircleOutlined style={{ color: "red" }} />
              </Tooltip>
            </span>
          </p>
          <Slider
            value={props.graphSettings.edge_labelSize}
            min={0}
            max={100}
            onChange={edge_labelSizeHandler}
            disabled={props.graphObject ? false : true}
          />
        </Col>

        <Col span={24}>
          <Checkbox
            style={{ fontSize: "10px" }}
            onChange={isEdgeScaledHandler}
            checked={graph_isEdgeScaled}
            disabled={props.graphObject ? false : true}>
            Scale edge to weight{" "}
            <span>
              <Tooltip
                title="Change the thickness of the edge accordin to its weight.
                  (e.g. the higher the transmission score the thicker the line)."
                placement="rightTop">
                <QuestionCircleOutlined style={{ color: "red" }} />
              </Tooltip>
            </span>
          </Checkbox>
        </Col>
        <Col span={24}>
          <p>
            Scaling factor{" "}
            <span>
              <Tooltip
                title="Multiply the thickness of the edge with the scaling factor (positive number greater than zero)"
                placement="rightTop">
                <QuestionCircleOutlined style={{ color: "red" }} />
              </Tooltip>
            </span>
          </p>
          <InputNumber
            min={0.00001}
            disabled={graph_isEdgeScaled && props.graphObject ? false : true}
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
            disabled={props.graphObject ? false : true}>
            Show partial edges{" "}
            <span>
              <Tooltip
                title="Only show edges which have weight within the specified range (min to max)
                (Note: It doesn't remove the edges but only hide it to the background)"
                placement="rightTop">
                <QuestionCircleOutlined style={{ color: "red" }} />
              </Tooltip>
            </span>
          </Checkbox>
        </Col>

        <Col span={11}>
          <p>Minimum</p>
          <InputNumber
            min={0}
            disabled={
              graph_isEdgesHideByCutoff && props.graphObject ? false : true
            }
            step={0.1}
            value={graph_edgesHideCutoff.min}
            onChange={edgesHideCutoffMinHandler}
          />
        </Col>

        <Col span={11}>
          <p>Maximum</p>
          <InputNumber
            min={0}
            disabled={
              graph_isEdgesHideByCutoff && props.graphObject ? false : true
            }
            step={0.1}
            value={graph_edgesHideCutoff.max}
            onChange={edgesHideCutoffMaxHandler}
          />
        </Col>

        <Col span={24}>
          <h5>Download settings</h5>
          <p>
            Type{" "}
            <span>
              <Tooltip
                title="Type of file to be downloaded: 
                Graph image (SVG). Graph object file in DOT format. Cluster(s) membership table(CSV)."
                placement="rightTop">
                <QuestionCircleOutlined style={{ color: "red" }} />
              </Tooltip>
            </span>
          </p>
          <Select
            value={graph_exportFormat}
            style={{ width: "100%" }}
            onChange={changeExportFormatHandler}
            disabled={props.graphObject || props.graphClusters ? false : true}>
            <Option disabled={props.graphObject ? false : true} value="svg">
              Graph image (SVG)
            </Option>
            <Option disabled={props.graphObject ? false : true} value="png">
              Graph image (PNG)
            </Option>
            <Option disabled={props.graphObject ? false : true} value="dot">
              Graph file (DOT)
            </Option>
            <Option
              disabled={props.graphClusters ? false : true}
              value="clusterID">
              Clustering result (CSV)
            </Option>
          </Select>
        </Col>
        <Col span={24}>
          <Button
            disabled={props.graphClusters || props.graphObject ? false : true}
            onClick={exportingHandler}
            type="primary">
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
    sequence: state.sequence,
    hammMatrix: state.hammMatrix,
    graphSettings: state.graphSettings,
    graphObject: state.graphObject,
    graphClusters: state.graphClusters,
    colorLUT: state.colorLUT,
    isShowingLoadingModal: state.isShowingLoadingModal,
    selectedNode: state.selectedNode,
    selectDemoData: state.selectDemoData,
    projectJSON: state.projectJSON,
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
      changeTransIcludeLocLevel,
      changeTypeOfAnalysisSetting,
      changeIsUserFilterEdgesSetting,
      changeIsUserRelayoutSetting,
      changeEdgeLabelSizeSetting,
      changeNodeIsLabelShown,
      changeNodeSizeSetting,
      isShowingLoadingModalToStore,
      changeSelectedNode,
      isinputLoadingToStore,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SiderMenu);

/*
 */
