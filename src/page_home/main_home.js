import "./style_home.css";
import React from "react";
import { Row, Col, Modal, Spin } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeNavLocation } from "../action/navigationActions";
import { LoadingOutlined } from "@ant-design/icons";
import InputPlaceholder from "./comp_inputPlaceholder";
import SelectDemoData from "./comp_selectDemoData";
import FooterComponent from "./comp_footer";

const loadingIcon = <LoadingOutlined style={{ fontSize: 34 }} spin />;

const Home = (props) => {
  return (
    <React.Fragment>
      <Row>
        <Col id="home-loading-info">
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
              tip="Preparing Data"
              size="large"
            />
          </Modal>
        </Col>
      </Row>

      <Row id="home-input-placeholder">
        <InputPlaceholder />
      </Row>

      <Row id="home-preloaded-data">
        <SelectDemoData />
      </Row>

      <Row>
        <FooterComponent />
      </Row>
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
/*
<Col xs={24} sm={12}>
          <SNPsLoader />
        </Col>
        <Col xs={24} sm={12}>
          <MetadataLoader />
        </Col>
*/
