import { Col, Empty, Layout } from "antd";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import GraphContainer from "./comp_graphContainer";
import MetadataBox from "./comp_metadataBox";
import ResultNotificationContent from "./comp_resultNotification";
import SiderMenu from "./comp_sider";
import "./style_graphsnp.css";

const { Sider, Content } = Layout;

const GraphSNP = (props) => {
  //console.log("page-graph-init");
  return (
    <React.Fragment>
      <Layout>
        <Sider id="graphsnp-sider" collapsible={false}>
          <SiderMenu />
          <ResultNotificationContent />
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
