import React from "react";
import { Row, Col, Modal, Spin } from "antd";
import "./style_home.css";
import { connect } from "react-redux";
//import { Link, NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import { changeNavLocation } from "../action/navigationActions";
import { LoadingOutlined } from "@ant-design/icons";
import SNPsLoader from "./comp_snpsLoader";
import MetadataLoader from "./comp_metadataLoader";
import PhyloTimeTreeLoader from "./comp_phylotimetreeLoader";
import FooterComponent from "./comp_footer";

const loadingIcon = <LoadingOutlined style={{ fontSize: 34 }} spin />;

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
              backgroundColor: "teal",
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
        <Col span={8}>
          <SNPsLoader />
        </Col>
        <Col span={8}>
          <MetadataLoader />
        </Col>
        <Col span={8}>
          <PhyloTimeTreeLoader />
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
