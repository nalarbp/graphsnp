import React, { useState } from "react";
import { Button, Row, Col, Select, InputNumber } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Option } = Select;

const SiderMenu = (props) => {
  //STATES
  const [edgeCutoff, setEdgeCutoff] = useState(0);
  //SETTINGS
  const graph_isUserReDraw = props.graphSettings.isUserReDraw;
  const graph_isUserFilterEdges = props.graphSettings.isUserFilterEdges.status;
  const graph_method = props.graphSettings.method;
  const graph_layout = props.graphSettings.layout;
  const graph_exportFormat = props.graphSettings.exportFormat;

  //HANDLERS
  const edgeCutoffHandler = (val) => {
    if (val > 0) {
      setEdgeCutoff(val);
    }
  };

  const drawingHandler = () => {
    if (!graph_isUserReDraw) {
      props.changeIsUserReDrawSetting(true);
    }
  };
  const filterEdgesHandler = () => {
    if (!graph_isUserFilterEdges) {
      props.changeIsUserFilterEdgesSetting({
        status: true,
        cutoff: edgeCutoff,
      });
    }
  };
  const changeMethodHandler = (val) => {
    props.changeMethodSetting(val);
  };
  const changeLayoutHandler = (val) => {
    props.changeLayoutSetting(val);
  };
  const changeExportFormatHandler = (val) => {
    props.changeExportFormatSetting(val);
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
            <Option value="cathai">CATHAI</Option>
            <Option value="slv">SLV graph</Option>
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
          <h5>Node settings</h5>
        </Col>

        <Col span={24}>
          <h5>Edge settings</h5>
          <p>Edge cutoff</p>
          <InputNumber
            min={0}
            step={0.1}
            value={edgeCutoff}
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

        <Col span={18}>
          <h5>Create graph</h5>
          <Button
            disabled={props.sequence ? false : true}
            onClick={drawingHandler}
          >
            Draw graph
          </Button>
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
