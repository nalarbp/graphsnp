import "./style_snpdist.css";
import React from "react";
import { Layout, Row, Col, Empty, Collapse } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { SettingOutlined } from "@ant-design/icons";

import SNPdistSettings from "./comp_snpDist_settings";
import SNPdistViewer from "./comp_snpDist_viewer";

const { Content } = Layout;
const { Panel } = Collapse;

const SNPdistance = (props) => {
  return (
    <React.Fragment>
      <Row className="gp-collapsible-container">
        <Collapse
          style={{
            backgroundColor: "transparent",
            border: "none",
            width: "100vw",
          }}
          accordion={true}
          bordered={false}
          expandIconPosition="left"
          defaultActiveKey={["1"]}
          ghost={true}>
          <Panel header={<SettingOutlined />} key="1">
            <SNPdistSettings />
          </Panel>
        </Collapse>
      </Row>

      <Row>
        <Layout id="snpdist-container">
          {props.hammingMatrix && (
            <Content>
              <SNPdistViewer />
            </Content>
          )}
          {!props.hammingMatrix && (
            <Content>
              <Col span={24}>
                <div id="snpdist-cont-is-empty" style={{ display: "block" }}>
                  <Empty
                    description={"No input: Load one."}
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                </div>
              </Col>
            </Content>
          )}
        </Layout>
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
<Sider
          id="snpdist-sider"
          collapsible={true}
          defaultCollapsed={true}
          collapsedWidth={0}
          breakpoint={"xs"}
        >
          <SNPdistSettings />
        </Sider>
*/
