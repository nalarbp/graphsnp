import React from "react";
import { Layout, Row, Col, Empty } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./style_snpDist.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import SNPdistSettings from "./comp_snpDist_settings";
import SNPdistViewer from "./comp_snpDist_viewer";

const { Sider, Content } = Layout;

const SNPdistance = (props) => {
  return (
    <React.Fragment>
      <Layout>
        <Sider id="snpdist-sider">
          <SNPdistSettings />
        </Sider>
        <Layout>
          <Content>{props.hammingMatrix && <SNPdistViewer />}</Content>
          <Content>
            {!props.hammingMatrix && (
              <Col span={24}>
                <div id="bar-chart-cont-is-empty" style={{ display: "block" }}>
                  <Empty
                    description={"No SNPs alignment input: Please load one."}
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                </div>
              </Col>
            )}
          </Content>
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
