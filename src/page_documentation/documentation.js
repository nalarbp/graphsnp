/* ============================================================================
============================================================================ */
import React from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeNavLocation } from "../action/navigationActions";
import "./style_documentation.css";

const Documentation = (props) => {
  return (
    <React.Fragment>
      <Layout id="page-documentation"></Layout>
    </React.Fragment>
  );
};
function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators({ changeNavLocation: changeNavLocation }, dispatch);
}

export default connect(null, mapDispatchToProps)(Documentation);
