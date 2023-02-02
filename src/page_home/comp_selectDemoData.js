import { Select } from "antd";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { categoricalMapToStore } from "../action/categoricalMapActions";
import { colorLUTtoStore } from "../action/colorActions";
import { resetStore } from "../action/generalActions";
import { hmmMatrixToStore } from "../action/graphMatrixActions";
import {
  isinputLoadingToStore,
  metadataToStore,
  projectJSONToStore,
  selectDemoDataToStore,
  sequenceToStore,
} from "../action/inputActions";
import * as constant from "../utils/constants";
import {
  getMatrixInput,
  getMetadataInput,
  loadProjectJSON,
  loadSNPsequence,
  snpsLoader,
} from "./util_home";

const { Option } = Select;

const SelectDemoData = (props) => {
  let project_options = [];

  //RETRIEVE PROJECTS.JSON
  if (props.projectJSON === null) {
    loadProjectJSON(constant.PROJECTS_JSON_URL, props.projectJSONToStore);
  }

  //List projects and create as options
  if (props.projectJSON) {
    props.projectJSON.forEach((v, k) => {
      project_options.push(
        <Option key={k} value={k}>
          {v.name}
        </Option>
      );
    });
  }

  const selectedDemoData =
    props.metadata && props.hammMatrix ? props.selectDemoData : null;

  const selectDemoDataHandler = (val) => {
    if (props.projectJSON && val) {
      props.resetStore();
      //load a new one
      let projectData = props.projectJSON.get(val);

      //meta
      if (projectData.metadata) {
        getMetadataInput(
          projectData.metadata,
          props.metadataToStore,
          props.colorLUTtoStore,
          props.categoricalMapToStore,
          props.isinputLoadingToStore
        );
      }

      //if snps alignment
      if (projectData.matrixOrAlignment === "alignment") {
        if (projectData.snpDistance) {
          loadSNPsequence(
            //need to do this because different parsing with drag and drop one
            projectData.snpDistance,
            props.sequenceToStore,
            props.hmmMatrixToStore,
            props.isinputLoadingToStore,
            snpsLoader
          );
        }
      } else if (projectData.matrixOrAlignment === "matrix") {
        if (projectData.snpDistance) {
          getMatrixInput(
            projectData.snpDistance,
            props.hmmMatrixToStore,
            props.isinputLoadingToStore
          );
        }
      }

      props.selectDemoDataToStore(val);
    } else {
      props.selectDemoDataToStore(null);
    }
  };

  return (
    <React.Fragment>
      <Select
        value={selectedDemoData}
        onChange={selectDemoDataHandler}
        className={"gp-select"}>
        <Option value={null}>Preloaded datasets</Option>
        {project_options}
      </Select>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    projectJSON: state.projectJSON,
    selectDemoData: state.selectDemoData,
    metadata: state.metadata,
    hammMatrix: state.hammMatrix,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      projectJSONToStore,
      selectDemoDataToStore,
      sequenceToStore,
      metadataToStore,
      isinputLoadingToStore,
      hmmMatrixToStore,
      colorLUTtoStore,
      categoricalMapToStore,
      resetStore,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectDemoData);

/*
 */
