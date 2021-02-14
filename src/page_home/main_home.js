import React from "react";
import { Row, Col, Modal, Spin } from "antd";
import "./style_home.css";
import { connect } from "react-redux";
//import { Link, NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import { changeNavLocation } from "../action/navigationActions";
import { LoadingOutlined } from "@ant-design/icons";
import SNPsLoader from "./comp_snpsLoader";
import TitleHeader from "./comp_titleHeader";
import MetadataLoader from "./comp_metadataLoader";
import PatientMovementLoader from "./comp_patientMovementLoader";
import FooterComponent from "./comp_footer";
import Particles from "react-particles-js";
import { vh } from "../utils/utils";

const loadingIcon = <LoadingOutlined style={{ fontSize: 34 }} spin />;
const getParticleHeight = String(vh(100) - 380) + "px";
const particleParams = {
  fpsLimit: 24,
  particles: {
    number: { value: 25 },
    size: { value: 4 },
    links: {
      enable: true,
      distance: 75,
    },
    move: {
      enable: true,
      speed: 2,
      outModes: {
        default: "bounce",
      },
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: false,
        mode: "repulse",
      },
    },
  },
};

const Home = (props) => {
  //console.log("Home");
  return (
    <React.Fragment>
      <Row>
        <Col xs={24} id="header-content">
          <Modal
            visible={props.isInputLoading}
            closable={false}
            centered={true}
            width={0}
            footer={null}
            bodyStyle={{
              textAlign: "center",
              padding: "0px",
            }}
          >
            <Spin
              indicator={loadingIcon}
              style={{ color: "white" }}
              tip="Processing..."
              size="large"
            />
          </Modal>
        </Col>
      </Row>
      <Row id="input-wrapper">
        <Particles
          params={particleParams}
          height={getParticleHeight}
          style={{ position: "absolute", height: "200px" }}
        />
        <Col xs={24} sm={8}>
          <SNPsLoader />
        </Col>
        <Col xs={24} sm={8}>
          <MetadataLoader />
        </Col>
        <Col xs={24} sm={8}>
          <PatientMovementLoader />
        </Col>
      </Row>
      <FooterComponent />
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    isInputLoading: state.isInputLoading,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeNavLocation,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

//Home called when navigating
//Called when input is loaded (cause it subsribed to the store, so when the connected state change it will be re-called)
/*
<Col xs={24}>
          <TitleHeader />
        </Col>
*/
