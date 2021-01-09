import React from "react";
import { Row, Col, Layout } from "antd";
//import "./style_graphsnp.css";
import { connect } from "react-redux";
//import { Link, NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import { changeNavLocation } from "../action/navigationActions";

const { Content } = Layout;

const GraphSNP = () => {
  return (
    <React.Fragment>
      <Layout>
        <Content>
          <Row>
            <Col></Col>
          </Row>
        </Content>
      </Layout>
    </React.Fragment>
  );
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeNavLocation: changeNavLocation }, dispatch);
}

export default connect(null, mapDispatchToProps)(GraphSNP);
