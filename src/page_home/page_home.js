import React from "react";
import { Row, Col } from "antd";
import "./style_home.css";
import { connect } from "react-redux";
//import { Link, NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import { changeNavLocation } from "../action/navigationActions";
import {
  sequenceToStore,
  colDatesToStore,
  exposurePeriodToStore,
} from "../action/inputActions";
import InputLoader from "./comp_inputLoader";
import FooterComponent from "./comp_footer";

const Home = (props) => {
  return (
    <React.Fragment>
      <Row>
        <Col xs={24} id="header-content">
          <InputLoader
            sequence={props.sequence}
            collectionDates={props.collectionDates}
            exposurePeriod={props.exposurePeriod}
            sequenceToStore={props.sequenceToStore}
            colDatesToStore={props.colDatesToStore}
            exposurePeriodToStore={props.exposurePeriodToStore}
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
    collectionDates: state.collectionDates,
    exposurePeriod: state.exposurePeriod,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeNavLocation,
      sequenceToStore,
      colDatesToStore,
      exposurePeriodToStore,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

/*
      
      */
