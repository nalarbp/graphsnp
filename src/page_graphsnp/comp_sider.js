import React from "react";
import { Button, Row, Col, Select, InputNumber } from "antd";

const { Option } = Select;

const SiderMenu = (props) => {
  //STATES

  //SETTINGS

  const graph_method = props.graphSettings.method;
  const graph_layout = props.graphSettings.layout;
  const graph_isUserReDraw = props.graphSettings.isUserReDraw;
  const graph_edgeFilterCutoff = props.graphSettings.edgeFilterCutoff;
  const graph_isUserFilterEdges = props.graphSettings.isUserFilteringEdge;
  const graph_clusterMethod = props.graphSettings.clusterMethod;
  const graph_isUserClustering = props.graphSettings.isUserClustering;
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

  const filterEdgesHandler = () => {
    if (!graph_isUserFilterEdges) {
      props.changeIsUserFilterEdgesSetting(true);
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

  const changeExportFormatHandler = (val) => {
    if (!graph_isUserDownloading) {
      props.changeExportFormatSetting(val);
    }
  };
  //input list data

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
          <h5>Edge settings</h5>
          <p>Edge cutoff</p>
          <InputNumber
            min={0}
            step={0.1}
            value={graph_edgeFilterCutoff}
            onChange={edgeCutoffHandler}
            style={{ marginBottom: "5px" }}
          />
          <Button
            disabled={props.sequence ? false : true}
            onClick={filterEdgesHandler}
          >
            Filter edges
          </Button>
        </Col>

        <Col span={24}>
          <p>Clustering method</p>
          <Select
            value={graph_clusterMethod}
            style={{ width: "100%" }}
            onChange={changeClusterMethodHandler}
          >
            <Option value="optimal">Optimal</Option>
            <Option value="walktrap">Walktrap</Option>
            <Option value="djikra">Djikra</Option>
          </Select>
        </Col>

        <Col span={24}>
          <Button onClick={clusteringHandler}>Find clusters</Button>
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

export default SiderMenu;

/*
<Col span={24}>
          <h5>Node settings</h5>
        </Col>

        <Col
          span={6}
          style={{ display: graph_isUserReDraw ? "block" : "none" }}
        >
          <h6>.</h6>
          <LoadingOutlined
            style={{
              fontSize: 18,
            }}
            spin
          />
        </Col>
*/
