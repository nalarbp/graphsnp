import React from "react";
import { Col, Select } from "antd";
import { connect } from "react-redux";
import * as constant from "../utils/constants";
import { hmmMatrixToStore } from "../action/graphMatrixActions";

import { bindActionCreators } from "redux";
import {
  selectDemoDataToStore,
  sequenceToStore,
  projectJSONToStore,
  metadataToStore,
  patientMovementToStore,
  isinputLoadingToStore,
} from "../action/inputActions";
import { colorLUTtoStore } from "../action/colorActions";
import { categoricalMapToStore } from "../action/categoricalMapActions";
import {
  loadProjectJSON,
  snpsLoader,
  getMetadataInput,
  getMatrixInput,
  loadSNPsequence,
  getPatientMovementInput,
} from "./util_inputLoaders";

const { Option } = Select;

//LOADER FUNCTION: ASSUME ALL DEMO FILE IS PASS ACTUAL INPUT LOADER

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

  const selectedDemoData = props.selectDemoData;

  //functions

  //handlers
  const selectDemoDataHandler = (val) => {
    // case for each demo data
    if (props.projectJSON && val) {
      //clean all states
      props.sequenceToStore(null);
      props.hmmMatrixToStore(null);
      props.metadataToStore(null);
      props.colorLUTtoStore(null);
      props.categoricalMapToStore(null);
      props.patientMovementToStore(null);

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

      //stay timeline
      // if (fileURL.stayTimeline) {
      //   getPatientMovementInput(
      //     fileURL.stayTimeline,
      //     props.patientMovementToStore,
      //     props.isinputLoadingToStore
      //   );
      // }

      props.selectDemoDataToStore(val);
    } else {
      props.selectDemoDataToStore(null);
    }
  };

  return (
    <React.Fragment>
      <Col xs={24}>
        <Select value={selectedDemoData} onChange={selectDemoDataHandler}>
          <Option value={null}>Preloaded dataset</Option>
          {project_options}
        </Select>
      </Col>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    projectJSON: state.projectJSON,
    selectDemoData: state.selectDemoData,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      projectJSONToStore,
      selectDemoDataToStore,
      sequenceToStore,
      metadataToStore,
      patientMovementToStore,
      isinputLoadingToStore,
      hmmMatrixToStore,
      colorLUTtoStore,
      categoricalMapToStore,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectDemoData);

/*

        */

// Changing component state will trigger Component-Init and Component-Render
