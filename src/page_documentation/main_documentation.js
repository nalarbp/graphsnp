/* ============================================================================
============================================================================ */
import React from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeNavLocation } from "../action/navigationActions";
import About from "./comp_about";
import InputFiles from "./comp_inputFiles";
import Extra from "./comp_extra";

import "./style_documentation.css";

const Documentation = (props) => {
  return (
    <React.Fragment>
      <Layout id="page-documentation">
        <About changeNavLocation={props.changeNavLocation} />
        <InputFiles />
        <Extra />
      </Layout>
    </React.Fragment>
  );
};
function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators({ changeNavLocation: changeNavLocation }, dispatch);
}

export default connect(null, mapDispatchToProps)(Documentation);
