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
                title="Select preloaded dataset for the visualisation."
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

/*
<Col className="gp-settings-box" xs={22} sm={10} lg={5}>
          <h5>
            Generate chart(s){" "}
            <span>
              <Tooltip
                title="Click to generate the chart(s)"
                placement="rightTop">
                <QuestionCircleOutlined style={{ color: "red" }} />
              </Tooltip>
            </span>
          </h5>
          <Button
            disabled={props.hammingMatrix ? false : true}
            onClick={drawChartHandler}
            type="primary">
            Create Bar chart
          </Button>
        </Col>

        <Col className="gp-settings-box" xs={22} sm={10} lg={5}>
          <h5>
            Select download type{" "}
            <span>
              <Tooltip
                title="Type of file to be downloaded: Table of pairwise SNP distances (CSV) or Displayed bar chart (SVG)"
                placement="rightTop">
                <QuestionCircleOutlined style={{ color: "red" }} />
              </Tooltip>
            </span>
          </h5>
          <Select
            className={"gp-select"}
            disabled={props.hammingMatrix ? false : true}
            value={snpDistExportFormat}
            onChange={exportFormatHandler}
            style={{ width: "100%" }}>
            <Option
              disabled={props.hammingMatrix ? false : true}
              value="symSnpDist">
              Table of pairwise SNP distances (CSV)
            </Option>
            <Option value="barChartSvg">Bar chart (SVG)</Option>
          </Select>
          <Divider style={{ margin: "5px 0px", opacity: 0 }} />
          <Button
            disabled={props.hammingMatrix ? false : true}
            onClick={exportChartHandler}
            type="primary">
            Download
          </Button>
        </Col>


<Col span={24}>
          <p>Chart(s) orientation</p>
          <Select
            value={chartOrientation}
            style={{ width: "100%" }}
            disabled={props.hammingMatrix ? false : true}
            onChange={chartOrientationHandler}
          >
            <Option value="horizontal">Horizontal</Option>
            <Option value="vertical">Vertical</Option>
          </Select>
        </Col>
*/
