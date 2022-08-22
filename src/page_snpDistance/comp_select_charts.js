import { QuestionCircleOutlined } from "@ant-design/icons";
import { Select, Tooltip } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  dist_changeChartsData,
  dist_changeDataColumn,
  dist_changeDataToDisplay,
} from "../action/snpdistSettingsActions";

const { Option } = Select;

const SelectCharts = (props) => {
  const dataToDisplay = props.snpDistSettings.dataToDisplay;
  const dataColumn = props.snpDistSettings.dataColumn;

  useEffect(() => {
    props.dist_changeDataColumn(null);
    let newState_cd = Object.assign({}, props.snpDistSettings.chartsData);
    newState_cd.groupPieData = null;
    newState_cd.groupViolinData = null;
    newState_cd.groupDistIntraInter = null;
    props.dist_changeChartsData(newState_cd);
  }, [dataToDisplay]);

  const dataToDisplayHandler = (val) => {
    props.dist_changeDataToDisplay(val);
  };

  const dataColumnHandler = (val) => {
    props.dist_changeDataColumn(val);
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

  return (
    <React.Fragment>
      <h5>
        Select sample(s) for the charts{" "}
        <span>
          <Tooltip
            title="Select all and or group of samples for the visualisation."
            placement="rightTop">
            <QuestionCircleOutlined style={{ color: "red" }} />
          </Tooltip>
        </span>
      </h5>
      <Select
        value={dataToDisplay}
        className={"gp-select"}
        disabled={props.hammingMatrix ? false : true}
        onChange={dataToDisplayHandler}>
        <Option value="all">All samples</Option>
        <Option disabled={props.metadata ? false : true} value="all-and-group">
          All + Group
        </Option>
      </Select>

      {dataToDisplay === "all-and-group" &&
        props.hammingMatrix &&
        props.metadata && (
          <React.Fragment>
            <h5>
              Select variable group (column){" "}
              <span>
                <Tooltip title="Column in metadata" placement="rightTop">
                  <QuestionCircleOutlined style={{ color: "red" }} />
                </Tooltip>
              </span>
            </h5>
            <Select
              value={dataColumn}
              className={"gp-select"}
              disabled={
                dataToDisplay === "all-and-group" &&
                props.hammingMatrix &&
                props.metadata
                  ? false
                  : true
              }
              onChange={dataColumnHandler}>
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
          </React.Fragment>
        )}
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
      dist_changeChartsData,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCharts);