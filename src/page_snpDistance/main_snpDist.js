import { SettingOutlined } from "@ant-design/icons";
import { Col, Collapse, Row } from "antd";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./style_snpdist.css";
import { ChartHeader } from "./util_snpDist";

import SNPDistBar from "./comp_snpDist_bar";
import SNPDistBoxplot from "./comp_snpDist_boxplot";
import SNPdistSettings from "./comp_snpDist_settings";

const { Panel } = Collapse;

const SNPdistance = (props) => {
  return (
    <React.Fragment>
      <Row className="gp-collapsible-container">
        <Collapse
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            border: "none",
            width: "100vw",
          }}
          accordion={true}
          bordered={false}
          expandIconPosition="left"
          defaultActiveKey={["1"]}
          ghost={true}>
          <Panel
            header={
              <p>
                Settings{" "}
                <SettingOutlined style={{ color: "red", fontSize: "11px" }} />
              </p>
            }
            key="1">
            <SNPdistSettings />
          </Panel>
        </Collapse>
      </Row>

      <Row id="snpdist-charts-container">
        <Col xs={24} md={12}>
          <div className="snpDist-chart-box">
            <ChartHeader
              title={"All samples barchart"}
              chartID={"gp-all-bar"}
            />
            <SNPDistBar />
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div className="snpDist-chart-box">
            <ChartHeader
              title={"All samples boxplot"}
              chartID={"gp-all-boxplot"}
            />
            <SNPDistBoxplot />
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    hammingMatrix: state.hammMatrix,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SNPdistance);

/*

{props.hammingMatrix && (
              <Content>
                <SNPdistViewer />
              </Content>
            )}
            {!props.hammingMatrix && (
              <div id="snpdist-cont-is-empty" style={{ display: "block" }}>
                <Empty
                  description={"No input: Load one."}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              </div>
            )}
 */
