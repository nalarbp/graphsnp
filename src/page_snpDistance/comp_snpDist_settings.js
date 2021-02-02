import React from "react";
import { Button, Row, Col, Select, Divider } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  dist_changeDataToDisplay,
  dist_changeDataColumn,
  dist_changeChartType,
  dist_changeExportFormat,
  dist_changeIsUserDraw,
  dist_changeIsUserExport,
} from "../action/snpdistSettingsActions";

const { Option } = Select;

const SNPdistSettings = (props) => {
  //STATES

  //SETTINGS
  const dataToDisplay = props.snpDistSettings.dataToDisplay;
  const dataColumn = props.snpDistSettings.dataColumn;
  const chartType = props.snpDistSettings.chartType;
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

  const chartTypeHandler = (val) => {
    props.dist_changeChartType(val);
  };

  const drawChartHandler = (val) => {
    if (!isUserDrawChart) {
      props.dist_changeIsUserDraw(true);
    }
  };

  const exportChartHandler = (val) => {
    if (!isUserExportSnpDist) {
      props.dist_changeIsUserExport(true);
    }
  };

  return (
    <React.Fragment>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <h5>Pair-wise SNPs distance settings</h5>
          <p>Show distribution for:</p>
          <Select
            value={dataToDisplay}
            style={{ width: "100%" }}
            disabled={props.hammingMatrix ? false : true}
            onChange={dataToDisplayHandler}
          >
            <Option value="all">All</Option>
            <Option value="per-category">Per metadata column</Option>
          </Select>
        </Col>

        <Col span={24}>
          <p>Available metadata column</p>
          <Select
            value={dataColumn}
            style={{ width: "100%" }}
            disabled={props.hammingMatrix ? false : true}
            onChange={dataColumnHandler}
          ></Select>
        </Col>

        <Col span={24}>
          <p>Chart(s) orientation</p>
          <Select
            value={chartType}
            style={{ width: "100%" }}
            disabled={props.hammingMatrix ? false : true}
            onChange={chartTypeHandler}
          >
            <Option value="horizontal">Horizontal</Option>
            <Option value="vertical">Vertical</Option>
          </Select>
        </Col>

        <Col span={24}>
          <Button
            disabled={props.hammingMatrix ? false : true}
            onClick={drawChartHandler}
          >
            Draw chart
          </Button>
        </Col>

        <Divider style={{ margin: "10px 0px 0px 0px" }} />

        <Col span={24}>
          <h5>Export settings</h5>
          <p>Export format </p>
          <Select value={snpDistExportFormat} style={{ width: "100%" }}>
            <Option value="svg">SVG</Option>
            <Option value="png">PNG</Option>
          </Select>
        </Col>

        <Col span={24}>
          <Button onClick={exportChartHandler}>Export chart</Button>
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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      dist_changeDataToDisplay,
      dist_changeDataColumn,
      dist_changeChartType,
      dist_changeExportFormat,
      dist_changeIsUserDraw,
      dist_changeIsUserExport,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SNPdistSettings);

/*

*/