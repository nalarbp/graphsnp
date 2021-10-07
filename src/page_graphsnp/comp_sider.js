import React from "react";
import {
  Button,
  Row,
  Col,
  Select,
  InputNumber,
  Checkbox,
  Divider,
  Tooltip,
  Modal,
  Spin,
} from "antd";
import {
  QuestionCircleOutlined,
  LoadingOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  createClusterCSVFile,
  createDOTGraph,
} from "../utils/create_exportFile";
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
  changeTransIcludeLocLevel,
  changeTypeOfAnalysisSetting,
  changeIsUserFilterEdgesSetting,
  changeIsUserRelayoutSetting,
} from "../action/graphSettingsActions";
import isShowingLoadingModalToStore from "../action/isShowingLoadingModalActions";

const { Option } = Select;
const loadingIcon = <LoadingOutlined style={{ fontSize: 34 }} spin />;

const SiderMenu = (props) => {
  //GLOBAL VAR
  //STATES

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
  const trans_locLevel = props.graphSettings.transIncludeLocLevel;
  const graph_typeOfAnalysis = props.graphSettings.typeOfAnalysis;
  const graph_isUserRelayout = props.graphSettings.isUserRelayout;

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
    props.changeMethodSetting(val);
  };

  const changeLayoutHandler = (val) => {
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

  const changeTransLocLevelHandler = (val) => {
    props.changeTransIcludeLocLevel(val);
  };

  const exportingHandler = () => {
    switch (graph_exportFormat) {
      case "clusterID":
        createClusterCSVFile(props.graphClusters.members);
        break;
      case "svg":
        props.changeIsUserDownloadingSetting(true);
        break;
      case "dot":
        createDOTGraph(props.graphObject);
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
      <Row>
        <Col xs={24} id="header-content">
          <Modal
            visible={props.isShowingLoadingModal}
            closable={false}
            centered={true}
            width={0}
            footer={null}
            bodyStyle={{
              textAlign: "center",
              padding: "0px",
            }}
          >
            <Spin
              indicator={loadingIcon}
              style={{ color: "white" }}
              tip="Preparing Graph"
              size="large"
            />
          </Modal>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <h5>Graph settings</h5>
          <p>
            Type of analysis{" "}
            <span>
              <Tooltip
                title="Analysis to be performed. [1]Clustering: construct an undirected graph and detect putative cluster(s). [2]Transmission: construct a directed graph to show the putative transmission flow"
                placement="rightTop"
              >
                <QuestionCircleOutlined style={{ color: "red" }} />
              </Tooltip>
            </span>
          </p>
          <Select
            disabled={props.hammMatrix ? false : true}
            value={graph_typeOfAnalysis}
            style={{ width: "100%" }}
            onChange={changeTypeOfAnalysisHandler}
          >
            <Option
              disabled={props.hammMatrix ? false : true}
              value="clustering"
            >
              {" "}
              Clustering{" "}
            </Option>
            <Option
              disabled={props.hammMatrix && props.metadata ? false : true}
              value="transmission"
            >
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
                  [1] CATHAI: given the SNP cut-off, create networks of pairwise SNP-distances between samples (Forde et al. 2021)"
                  placement="rightTop"
                >
                  <QuestionCircleOutlined style={{ color: "red" }} />
                </Tooltip>
              </span>
            </p>
            <Select
              disabled={props.hammMatrix && graph_typeOfAnalysis ? false : true}
              value={graph_method}
              style={{ width: "100%" }}
              onChange={changeMethodHandler}
            >
              <Option value="cathai">CATHAI</Option>
              <Option
                value="mscg"
                disabled={graph_isUserFilterEdges ? false : true}
              >
                MSCG
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
                  [1]SeqTrack: construct a parsimonous transmission tree based on SNP distances and sampling dates (Jombart et al. 2014). 
                  [2]SNPs and patient stay: construct a directed graph where edges were weighted by sum of SNPs distance weight and patient stays"
                  placement="rightTop"
                >
                  <QuestionCircleOutlined style={{ color: "red" }} />
                </Tooltip>
              </span>
            </p>
            <Select
              disabled={graph_typeOfAnalysis ? false : true}
              value={graph_method}
              style={{ width: "100%" }}
              onChange={changeMethodHandler}
            >
              <Option
                disabled={props.hammMatrix && props.metadata ? false : true}
                value="seqtrack"
              >
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
                placement="rightTop"
              >
                <QuestionCircleOutlined style={{ color: "red" }} />
              </Tooltip>
            </span>
          </p>
          <Select
            disabled={props.hammMatrix ? false : true}
            value={graph_layout}
            style={{ width: "100%" }}
            onChange={changeLayoutHandler}
          >
            <Option value="cose"> CoSE</Option>
            <Option value="spread">Spread</Option>
            <Option value="fcose">fCoSE</Option>
          </Select>
        </Col>
        <Col span={8}>
          <p>
            Refresh{" "}
            <span>
              <Tooltip
                title="Apply selected layout to current graph."
                placement="rightTop"
              >
                <QuestionCircleOutlined style={{ color: "red" }} />
              </Tooltip>
            </span>
          </p>
          <Button
            disabled={props.graphObject ? false : true}
            onClick={reloadLayoutHandler}
            type="primary"
          >
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
            }
          >
            Apply SNPs cutoff{" "}
            <span>
              <Tooltip
                title="Apply a cutoff number to limit the maximum pairwise SNPs distance to be displayed."
                placement="rightTop"
              >
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
                placement="rightTop"
              >
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

        {graph_method === "hierSnpsMetaStayOverlap" && (
          <Col span={24}>
            <p>
              Filter weighted edges
              <span>
                <Tooltip
                  title="Filter edges based on its weight. 
                The weight is a combination score computed from pairwise SNP distances and stay overlap in hierarhical order.
                The weight assignation are: 
                #1 (all SNP distances), 
                #2 (#1+SNP distances less and equal to cutoff),
                #3 (#2+They had overlap stay at hospital level),
                #4 (#3+They had overlap stay at ward level),
                #5 (#4+They had overlap stay at bay level), and
                #6 (#5+They had overlap stay at bed level).
                So an edge with weight of #6 represents the highest score for a possible transmission
                based on their SNPs distance and stay overlap in bed level.
                *Stay overlap is considered in 7 days range (REF)"
                  placement="rightTop"
                >
                  <QuestionCircleOutlined style={{ color: "red" }} />
                </Tooltip>
              </span>
            </p>
            <Select
              disabled={
                graph_method === "hierSnpsMetaStayOverlap" ? false : true
              }
              value={trans_locLevel}
              style={{ width: "100%" }}
              onChange={changeTransLocLevelHandler}
            >
              <Option value={1}>SNPs</Option>
              <Option value={2}>Hospital</Option>
              <Option value={3}>Ward</Option>
              <Option value={4}>Bay</Option>
              <Option value={5}>Bed</Option>
            </Select>
          </Col>
        )}

        <Col span={24}>
          <Button
            disabled={props.hammMatrix ? false : true}
            onClick={drawingHandler}
            type="primary"
          >
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
                  title="Method to detect cluster in the constructed graph.
                  [1]Connected components: using Breadth-first search algorithm (Zhou and Hansen,2006) to find cluster (all connected nodes)
                  [2]Louvain: using Louvain algoritm (Subelj and Bajec, 2011) to find the cluster(s) "
                  placement="rightTop"
                >
                  <QuestionCircleOutlined style={{ color: "red" }} />
                </Tooltip>
              </span>
            </p>
            <Select
              disabled={props.graphObject ? false : true}
              value={graph_clusterMethod}
              style={{ width: "100%" }}
              onChange={changeClusterMethodHandler}
            >
              <Option value="Connected Components">Connected Components</Option>
            </Select>
          </Col>
        )}

        {graph_typeOfAnalysis === "clustering" && props.graphObject && (
          <Col span={24}>
            <Button
              type="primary"
              disabled={props.graphObject ? false : true}
              onClick={clusteringHandler}
            >
              Detect clusters
            </Button>
          </Col>
        )}

        <Divider style={{ margin: "10px 0px 0px 0px" }} />

        <Col span={24}>
          <h5>Visualization settings</h5>
          <Checkbox
            style={{ fontSize: "10px" }}
            onChange={isEdgeScaledHandler}
            checked={graph_isEdgeScaled}
            disabled={props.graphObject ? false : true}
          >
            Scale edge to its weight{" "}
            <span>
              <Tooltip
                title="Change the thickness of the edge accordin to its weight.
                  (e.g. the higher the transmission score the thicker the line)."
                placement="rightTop"
              >
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
                placement="rightTop"
              >
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
            disabled={props.graphObject ? false : true}
          >
            Show partial edges{" "}
            <span>
              <Tooltip
                title="Only show edges which have weight within the specified range (min to max)
                (Note: It doesn't remove the edges but only hide it to the background)"
                placement="rightTop"
              >
                <QuestionCircleOutlined style={{ color: "red" }} />
              </Tooltip>
            </span>
          </Checkbox>
        </Col>

        <Col span={12}>
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

        <Col span={12}>
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
          <p>
            Node color{" "}
            <span>
              <Tooltip
                title="Color nodes by the selected column in metadata or by the clustering result.
                User can also specify the color manually
                (e.g. To specify color on column 'patient_group', add new column named 'patient_group:color' in metadata)."
                placement="rightTop"
              >
                <QuestionCircleOutlined style={{ color: "red" }} />
              </Tooltip>
            </span>
          </p>
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
          <h5>Download settings</h5>
          <p>
            Type{" "}
            <span>
              <Tooltip
                title="Type of file to be downloaded: 
                [1]Graph image (SVG)
                [2]Graph object file (DOT format: suitable for visualization with HAIviz)
                [3]Clustering result (CSV)."
                placement="rightTop"
              >
                <QuestionCircleOutlined style={{ color: "red" }} />
              </Tooltip>
            </span>
          </p>
          <Select
            value={graph_exportFormat}
            style={{ width: "100%" }}
            onChange={changeExportFormatHandler}
            disabled={props.graphObject || props.graphClusters ? false : true}
          >
            <Option disabled={props.graphObject ? false : true} value="svg">
              Graph image (SVG)
            </Option>
            <Option disabled={props.graphObject ? false : true} value="dot">
              Graph file (DOT)
            </Option>
            <Option
              disabled={props.graphClusters ? false : true}
              value="clusterID"
            >
              Clustering result (CSV)
            </Option>
          </Select>
        </Col>
        <Col span={24}>
          <Button
            disabled={props.graphClusters || props.graphObject ? false : true}
            onClick={exportingHandler}
            type="primary"
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
    patientMovement: state.patientMovement,
    sequence: state.sequence,
    hammMatrix: state.hammMatrix,
    graphSettings: state.graphSettings,
    graphObject: state.graphObject,
    graphClusters: state.graphClusters,
    colorLUT: state.colorLUT,
    isShowingLoadingModal: state.isShowingLoadingModal,
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
      isShowingLoadingModalToStore,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SiderMenu);

/*
<Option disabled={props.hammMatrix && props.metadata ? false : true} value="hierSnpsMetaStayOverlap">
                SNPs and patient stay
              </Option>

                            <Option
                disabled={props.hammMatrix && props.metadata ? false : true}
                value="cge"
              >
                CATHAI + metadata
              </Option>
*/
