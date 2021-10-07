import React from "react";
import { Button, Row, Col, Select, Divider, Tooltip, Modal, Spin } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { QuestionCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  dist_changeDataToDisplay,
  dist_changeDataColumn,
  dist_changeDataColumnLevel,
  dist_changeChartOrientation,
  dist_changeExportFormat,
  dist_changeIsUserDraw,
  dist_changeIsUserExport,
} from "../action/snpdistSettingsActions";

import { filterUnique } from "../utils/utils";

const { Option } = Select;
const loadingIcon = <LoadingOutlined style={{ fontSize: 34 }} spin />;

const SNPdistSettings = (props) => {
  //GLOBAL
  const metadata_arr = props.metadata
    ? Array.from(props.metadata.values())
    : null;

  //STATES

  //SETTINGS
  const dataToDisplay = props.snpDistSettings.dataToDisplay;
  const dataColumn = props.snpDistSettings.dataColumn;
  const dataColumnLevel = props.snpDistSettings.dataColumnLevel;
  const chartOrientation = props.snpDistSettings.chartOrientation;
  const snpDistExportFormat = props.snpDistSettings.snpDistExportFormat;
  const isUserDrawChart = props.snpDistSettings.isUserDrawChart;
  const isUserExportSnpDist = props.snpDistSettings.isUserExportSnpDist;

  //HANDLERS
  const dataToDisplayHandler = (val) => {
    props.dist_changeDataToDisplay(val);
  };

  const dataColumnHandler = (val) => {
    props.dist_changeDataColumn(val);
  };

  const dataColumnLevelHandler = (val) => {
    props.dist_changeDataColumnLevel(val);
  };

  const chartOrientationHandler = (val) => {
    props.dist_changeChartOrientation(val);
  };

  const drawChartHandler = (val) => {
    if (!isUserDrawChart) {
      props.dist_changeIsUserDraw(true);
    }
  };

  const exportFormatHandler = (val) => {
    props.dist_changeExportFormat(val);
  };

  const exportChartHandler = (val) => {
    console.log("downlaod handlers");
    if (!isUserExportSnpDist) {
      props.dist_changeIsUserExport(true);
    }
  };
  const getMetadataColumn = function (header, i) {
    const excluded_headers = ["sample_date", "patient_id"];
    if (excluded_headers.indexOf(header) === -1) {
      return (
        <Option key={i} disabled={false} value={header}>
          {header}
        </Option>
      );
    }
  };

  const getMetadataColumnLevels_arr = function (metadata_arr, dataColumn) {
    if (metadata_arr && dataColumn) {
      let dataColumnLevels_arr = metadata_arr
        .map((d) => d[dataColumn])
        .filter(filterUnique);

      if (
        Array.isArray(dataColumnLevels_arr) &&
        dataColumnLevels_arr.length > 0
      ) {
        dataColumnLevels_arr.unshift("INTER-Group");
        dataColumnLevels_arr.unshift("INTRA-Group");
        return dataColumnLevels_arr;
      } else {
        return ["#na_exluded!"];
      }
    } else {
      return ["#na_exluded!"];
    }
  };

  const getMetadataColumnLevel = function (level, idx) {
    const excluded_headers = ["#na_exluded!"];
    if (excluded_headers.indexOf(level) === -1) {
      return (
        <Option key={idx} disabled={false} value={level}>
          {level}
        </Option>
      );
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col xs={24} id="header-content">
          <Modal
            visible={props.isShowingLoadingModal}
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
              tip="Preparing Chart"
              size="large"
            />
          </Modal>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <h5>Visualization settings</h5>
          <p>
            Select samples{" "}
            <span>
              <Tooltip
                title="Select group of sample for bar chart visualization."
                placement="rightTop"
              >
                <QuestionCircleOutlined style={{ color: "red" }} />
              </Tooltip>
            </span>
          </p>
          <Select
            value={dataToDisplay}
            style={{ width: "100%" }}
            disabled={props.hammingMatrix ? false : true}
            onChange={dataToDisplayHandler}
          >
            <Option value="all">All samples</Option>
            <Option
              disabled={props.metadata ? false : true}
              value="per-category"
            >
              Specific group (metadata)
            </Option>
          </Select>
        </Col>

        {dataToDisplay === "per-category" &&
          props.hammingMatrix &&
          props.metadata && (
            <Col span={24}>
              <p>
                Select metadata column{" "}
                <span>
                  <Tooltip
                    title="Column in metadata which group of sample to be displayed"
                    placement="rightTop"
                  >
                    <QuestionCircleOutlined style={{ color: "red" }} />
                  </Tooltip>
                </span>
              </p>
              <Select
                value={dataColumn}
                style={{ width: "100%" }}
                disabled={
                  dataToDisplay === "per-category" &&
                  props.hammingMatrix &&
                  props.metadata
                    ? false
                    : true
                }
                onChange={dataColumnHandler}
              >
                {props.colorLUT && Object.keys(props.colorLUT)
                  ? Object.keys(props.colorLUT).map((k, i) => {
                      return getMetadataColumn(k, i);
                    })
                  : ["na"].map((l, j) => {
                      return (
                        <Option key={j} disabled={false} value={l}>
                          {l}
                        </Option>
                      );
                    })}
              </Select>
            </Col>
          )}

        {dataToDisplay === "per-category" &&
          dataColumn &&
          props.metadata &&
          metadata_arr && (
            <Col span={24}>
              <p>
                Select group{" "}
                <span>
                  <Tooltip
                    title="Categorical group from the selected metadata column"
                    placement="rightTop"
                  >
                    <QuestionCircleOutlined style={{ color: "red" }} />
                  </Tooltip>
                </span>
              </p>
              <Select
                value={dataColumnLevel}
                style={{ width: "100%" }}
                disabled={
                  dataToDisplay !== "all" &&
                  dataColumn &&
                  props.metadata &&
                  metadata_arr
                    ? false
                    : true
                }
                onChange={dataColumnLevelHandler}
              >
                {dataColumn && metadata_arr
                  ? getMetadataColumnLevels_arr(metadata_arr, dataColumn).map(
                      (e, x) => {
                        return getMetadataColumnLevel(e, x);
                      }
                    )
                  : ["na"].map((l, j) => {
                      return (
                        <Option key={j} disabled={false} value={l}>
                          {l}
                        </Option>
                      );
                    })}
              </Select>
            </Col>
          )}

        <Col span={24}>
          <Button
            disabled={props.hammingMatrix ? false : true}
            onClick={drawChartHandler}
            type="primary"
          >
            Create Bar chart
          </Button>
        </Col>

        <Divider style={{ margin: "10px 0px 0px 0px" }} />

        <Col span={24}>
          <h5>Download settings</h5>
          <p>
            Type{" "}
            <span>
              <Tooltip
                title="Type of file to be downloaded: Table of pairwise SNP distances (CSV) or Displayed bar chart (SVG)"
                placement="rightTop"
              >
                <QuestionCircleOutlined style={{ color: "red" }} />
              </Tooltip>
            </span>
          </p>
          <Select
            disabled={props.hammingMatrix ? false : true}
            value={snpDistExportFormat}
            onChange={exportFormatHandler}
            style={{ width: "100%" }}
          >
            <Option
              disabled={props.hammingMatrix ? false : true}
              value="symSnpDist"
            >
              Table of pairwise SNP distances (CSV)
            </Option>
            <Option value="barChartSvg">Bar chart (SVG)</Option>
          </Select>
        </Col>

        <Col span={24}>
          <Button
            disabled={props.hammingMatrix ? false : true}
            onClick={exportChartHandler}
            type="primary"
          >
            Download
          </Button>
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
      dist_changeDataToDisplay,
      dist_changeDataColumn,
      dist_changeDataColumnLevel,
      dist_changeChartOrientation,
      dist_changeExportFormat,
      dist_changeIsUserDraw,
      dist_changeIsUserExport,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SNPdistSettings);

/*
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
