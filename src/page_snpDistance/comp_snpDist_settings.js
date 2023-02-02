import { LoadingOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Col, Modal, Row, Spin, Tooltip } from "antd";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  dist_changeExportFormat,
  dist_changeIsUserDraw,
  dist_changeIsUserExport,
} from "../action/snpdistSettingsActions";

import SelectDemoData from "../page_home/comp_selectDemoData";
import SelectCharts from "./comp_select_charts";
import DrawSNPdistCharts from "./comp_snpDist_drawCharts";

const loadingIcon = <LoadingOutlined style={{ fontSize: 34 }} spin />;

const SNPdistSettings = (props) => {
  return (
    <React.Fragment>
      <Row>
        <Modal
          visible={props.isShowingLoadingModal}
          closable={false}
          centered={true}
          width={0}
          footer={null}
          bodyStyle={{
            textAlign: "center",
            padding: "0px",
          }}>
          <Spin
            indicator={loadingIcon}
            style={{ color: "white" }}
            tip="Preparing Chart"
            size="large"
          />
        </Modal>
      </Row>

      <Row gutter={[16, 16]} id="gp-settings-box-container">
        <Col className="gp-settings-box" xs={22} sm={10} lg={5}>
          <h5>
            Select preloaded dataset{" "}
            <span>
              <Tooltip
                title="Ignore this tab, if you have loaded your data"
                placement="rightTop">
                <QuestionCircleOutlined style={{ color: "red" }} />
              </Tooltip>
            </span>
          </h5>
          <SelectDemoData />
        </Col>

        <Col className="gp-settings-box" xs={22} sm={10} lg={5}>
          <SelectCharts />
        </Col>

        <Col className="gp-settings-box" xs={22} sm={10} lg={5}>
          <DrawSNPdistCharts />
        </Col>
      </Row>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    snpDistSettings: state.snpDistSettings,
    hammingMatrix: state.hammMatrix,
    colorLUT: state.colorLUT,
    metadata: state.metadata,
    isShowingLoadingModal: state.isShowingLoadingModal,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      dist_changeExportFormat,
      dist_changeIsUserDraw,
      dist_changeIsUserExport,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SNPdistSettings);
