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
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
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
} from "../action/graphSettingsActions";

const { Option } = Select;

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

  const drawingHandler = () => {
    if (!graph_isUserReDraw) {
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
            disabled={props.sequence ? false : true}
            value={graph_typeOfAnalysis}
            style={{ width: "100%" }}
            onChange={changeTypeOfAnalysisHandler}
          >
            <Option disabled={props.sequence ? false : true} value="clustering">
              {" "}
              Clustering{" "}
            </Option>
            <Option
              disabled={props.sequence && props.metadata ? false : true}
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
                  [1]CATHAI: draw all pairwise SNP distances between nodes (cases) (Forde et al. 2021). 
                  [2]Minimum CATHAI: Like CATHAI but only include the smallest pairwise SNP distance(s) as the representation of each node 
                  [3]Weighted minimum CATHAI: Like minimum CATHAI but weighted with other categorical information from the metadata"
                  placement="rightTop"
                >
                  <QuestionCircleOutlined style={{ color: "red" }} />
                </Tooltip>
              </span>
            </p>
            <Select
              disabled={props.sequence && graph_typeOfAnalysis ? false : true}
              value={graph_method}
              style={{ width: "100%" }}
              onChange={changeMethodHandler}
            >
              <Option value="cathai">CATHAI</Option>
              <Option value="mcg">Minimum CATHAI</Option>
              <Option
                disabled={props.sequence && props.metadata ? false : true}
                value="cge"
              >
                Weighted minimum CATHAI
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
              <Option value="seqtrack">SeqTrack</Option>
              <Option value="hierSnpsMetaStayOverlap">
                SNPs and patient stay
              </Option>
            </Select>
          </Col>
        )}

        <Col span={24}>
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
            disabled={props.sequence ? false : true}
            value={graph_layout}
            style={{ width: "100%" }}
            onChange={changeLayoutHandler}
          >
            <Option value="cose"> CoSE</Option>
            <Option value="spread">Spread</Option>
            <Option value="fcose">fCoSE</Option>
          </Select>
        </Col>

        <Col span={24}>
          <Checkbox
            style={{ fontSize: "10px" }}
            onChange={isUserFilterEdgesdHandler}
            checked={graph_isUserFilterEdges}
            disabled={
              props.sequence && graph_typeOfAnalysis === "clustering"
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

        {graph_isUserFilterEdges && (
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
              disabled={props.sequence ? false : true}
              step={1}
              value={graph_edgeFilterCutoff}
              onChange={edgeCutoffHandler}
              style={{ marginBottom: "5px" }}
            />
          </Col>
        )}

        {graph_method === "hierSnpsMetaStayOverlap" && (
          <Col span={24}>
            <p>Filter transmission edges from: (hierarchically) </p>
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
            disabled={props.sequence ? false : true}
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
              <Option value="Louvain">Louvain</Option>
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
            Hide edges{" "}
            <span>
              <Tooltip
                title="Hide edges which have weight within the specified range (min to max)
                (Note: It doesn't remove the edges but only hide it to the background)"
                placement="rightTop"
              >
                <QuestionCircleOutlined style={{ color: "red" }} />
              </Tooltip>
            </span>
          </Checkbox>
        </Col>

        {graph_isEdgesHideByCutoff && (
          <Col span={12}>
            <p>Minimum</p>
            <InputNumber
              min={0}
              disabled={props.graphObject ? false : true}
              step={0.1}
              value={graph_edgesHideCutoff.min}
              onChange={edgesHideCutoffMinHandler}
            />
          </Col>
        )}
        {graph_isEdgesHideByCutoff && (
          <Col span={12}>
            <p>Maximum</p>
            <InputNumber
              min={0}
              disabled={props.graphObject ? false : true}
              step={0.1}
              value={graph_edgesHideCutoff.max}
              onChange={edgesHideCutoffMaxHandler}
            />
          </Col>
        )}

        <Col span={24}>
          <p>
            Nodes coloring{" "}
            <span>
              <Tooltip
                title="Color nodes by the selected column in metadata or by the clustering result.
                User can also specify the color manually
                (e.g. To specify color on column 'patient_group' add new column called 'patient_group:color' in metadata)."
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
      changeTransIcludeLocLevel,
      changeTypeOfAnalysisSetting,
      changeIsUserFilterEdgesSetting,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SiderMenu);

/*

*/
