import React from "react";
import { Col, Select, Tooltip } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { filterUnique } from "../utils/utils";
import {
  dist_changeDataToDisplay,
  dist_changeDataColumn,
  dist_changeDataColumnLevel,
} from "../action/snpdistSettingsActions";

const { Option } = Select;

const SelectSamples = (props) => {
  const metadata_arr = props.metadata
    ? Array.from(props.metadata.values())
    : null;

  const dataToDisplay = props.snpDistSettings.dataToDisplay;
  const dataColumn = props.snpDistSettings.dataColumn;
  const dataColumnLevel = props.snpDistSettings.dataColumnLevel;

  const dataToDisplayHandler = (val) => {
    props.dist_changeDataToDisplay(val);
  };

  const dataColumnHandler = (val) => {
    props.dist_changeDataColumn(val);
  };

  const dataColumnLevelHandler = (val) => {
    props.dist_changeDataColumnLevel(val);
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
      <h5>
        Select sample(s){" "}
        <span>
          <Tooltip
            title="Select group of sample for the visualisation."
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
        <Option disabled={props.metadata ? false : true} value="per-category">
          Subset from metadata
        </Option>
      </Select>

      {dataToDisplay === "per-category" &&
        props.hammingMatrix &&
        props.metadata && (
          <React.Fragment>
            <h5>
              Select variable (column){" "}
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
                dataToDisplay === "per-category" &&
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

      {dataToDisplay === "per-category" &&
        dataColumn &&
        props.metadata &&
        metadata_arr && (
          <React.Fragment>
            <h5>
              Select group (of rows){" "}
              <span>
                <Tooltip
                  title="Categorical group from the selected metadata column"
                  placement="rightTop">
                  <QuestionCircleOutlined style={{ color: "red" }} />
                </Tooltip>
              </span>
            </h5>
            <Select
              value={dataColumnLevel}
              className={"gp-select"}
              disabled={
                dataToDisplay !== "all" &&
                dataColumn &&
                props.metadata &&
                metadata_arr
                  ? false
                  : true
              }
              onChange={dataColumnLevelHandler}>
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
      dist_changeDataColumnLevel,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectSamples);
