import "./snpdist_style.css";
import React from "react";
import { Layout, Col, Empty } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import SNPdistSettings from "./comp_snpDist_settings";
import SNPdistViewer from "./comp_snpDist_viewer";

const { Sider, Content } = Layout;

const SNPdistance = (props) => {
  return (
    <React.Fragment>
      <Layout>
        <Sider
          id="snpdist-sider"
          collapsible={true}
          defaultCollapsed={true}
          collapsedWidth={0}
          breakpoint={"xs"}
        >
          <SNPdistSettings />
        </Sider>
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
      </Layout>
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
