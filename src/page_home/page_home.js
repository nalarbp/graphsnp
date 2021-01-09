import React from "react";
import { Row, Col } from "antd";
import "./style_home.css";
import { connect } from "react-redux";
//import { Link, NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import { changeNavLocation } from "../action/navigationActions";
import { sequenceToStore } from "../action/inputActions";
import InputLoader from "./comp_inputLoader";
import FooterComponent from "./comp_footer";

const Home = (props) => {
  return (
    <React.Fragment>
      <Row>
        <Col xs={24} id="header-content">
          <InputLoader
            sequence={props.sequence}
            sequenceToStore={props.sequenceToStore}
          />
        </Col>
      </Row>
      <FooterComponent />
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    sequence: state.sequence,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeNavLocation, sequenceToStore }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

/*
      
      */
