import React from "react";
import { Layout, Col, Empty } from "antd";
import "./style_graphsnp.css";
import MetadataBox from "./comp_metadataBox";
import SiderMenu from "./comp_sider";
import GraphContainer from "./comp_graphContainer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const { Sider, Content } = Layout;

const GraphSNP = (props) => {
  //console.log("page-graph-init");
  return (
    <React.Fragment>
      <Layout>
        <Sider id="graphsnp-sider">
          <SiderMenu />
        </Sider>
        <Layout id="graphsnp-container">
          {props.hammingMatrix && (
            <Content>
              <MetadataBox />
              <GraphContainer />
            </Content>
          )}
          {!props.hammingMatrix && (
            <Content>
              <Col span={24}>
                <div id="graph-cont-is-empty" style={{ display: "block" }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(GraphSNP);
