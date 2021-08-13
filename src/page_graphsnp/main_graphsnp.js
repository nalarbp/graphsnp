import React from "react";
import { Layout } from "antd";
import "./style_graphsnp.css";
import MetadataBox from "./comp_metadataBox";
import SiderMenu from "./comp_sider";
import GraphContainer from "./comp_graphContainer";

const { Sider, Content } = Layout;

const GraphSNP = () => {
  //console.log("page-graph-init");
  return (
    <React.Fragment>
      <Layout>
        <Sider id="graphsnp-sider">
          <SiderMenu />
        </Sider>
        <Layout>
          <Content id="graphsnp-container">
            <MetadataBox />
            <GraphContainer />
          </Content>
        </Layout>
      </Layout>
    </React.Fragment>
  );
};

export default GraphSNP;
