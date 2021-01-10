import React from "react";
import { Button, Slider, Row, Col, Divider, Select } from "antd";

const { Option } = Select;

const SiderMenu = (props) => {
  //SETTINGS/STATE
  const graph_isUserReDraw = props.graphSettings.isUserReDraw;
  const graph_method = props.graphSettings.method;
  const graph_layout = props.graphSettings.layout;
  const graph_exportFormat = props.graphSettings.exportFormat;
  const graph_isUserDownloading = props.graphSettings.isUserDownloading;

  //HANDLERS
  const drawingHandler = (val) => {
    console.log(val);
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
          <h6>General settings</h6>
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
          </Select>
        </Col>

        <Col span={24}>
          <h6>Node settings</h6>
        </Col>

        <Col span={24}>
          <h6>Create graph</h6>
          <Button onClick={drawingHandler}>Draw graph</Button>
        </Col>
        <Col span={24}>
          <h6>Export settings</h6>
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
