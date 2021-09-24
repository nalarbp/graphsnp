import React from "react";
import { Col, Select } from "antd";
import { connect } from "react-redux";
import * as constant from "../utils/constants";
import { hmmMatrixToStore } from "../action/graphMatrixActions";

import { bindActionCreators } from "redux";
import {
  selectDemoDataToStore,
  sequenceToStore,
  metadataToStore,
  patientMovementToStore,
  isinputLoadingToStore,
} from "../action/inputActions";
import { colorLUTtoStore } from "../action/colorActions";
import { categoricalMapToStore } from "../action/categoricalMapActions";
import {
  snpsLoader,
  getMetadataInput,
  getPatientMovementInput,
} from "./util_inputLoaders";

const { Option } = Select;

//LOADER FUNCTION: ASSUME ALL DEMO FILE IS PASS ACTUAL INPUT LOADER

//===============

const SelectDemoData = (props) => {
  //general variable
  const selectedDemoData = props.selectDemoData;

  //functions
  async function loadSNPsequence(
    fileURL,
    propsSequenceToStore,
    propsHmmMatrixToStore,
    propsIsinputLoadingToStore,
    snpsLoader
  ) {
    let response = await fetch(fileURL);

    propsIsinputLoadingToStore(true);
    let dataInBlob = await response.blob();
    const reader = new FileReader();
    reader.readAsText(dataInBlob);
    reader.onloadend = function (evt) {
      const dataText = evt.target.result;
      snpsLoader(
        dataText,
        propsSequenceToStore,
        propsHmmMatrixToStore,
        propsIsinputLoadingToStore
      );
    };
  }

  //handlers
  const selectDemoDataHandler = (val) => {
    // case for each demo data
    if (val) {
      let fileURL = constant.DEMO[val];
      //clean all states
      props.sequenceToStore(null);
      props.hmmMatrixToStore(null);
      props.metadataToStore(null);
      props.colorLUTtoStore(null);
      props.categoricalMapToStore(null);
      props.patientMovementToStore(null);

      //load a new one
      //snps
      if (fileURL.snps) {
        loadSNPsequence(
          fileURL.snps,
          props.sequenceToStore,
          props.hmmMatrixToStore,
          props.isinputLoadingToStore,
          snpsLoader
        );
      }

      //meta
      if (fileURL.metadata) {
        getMetadataInput(
          fileURL.metadata,
          props.metadataToStore,
          props.colorLUTtoStore,
          props.categoricalMapToStore,
          props.isinputLoadingToStore
        );
      }

      //stay timeline
      if (fileURL.stayTimeline) {
        getPatientMovementInput(
          fileURL.stayTimeline,
          props.patientMovementToStore,
          props.isinputLoadingToStore
        );
      }
      props.selectDemoDataToStore(val);
    } else {
      props.selectDemoDataToStore(null);
    }
  };

  return (
    <React.Fragment>
      <Col xs={24}>
        <Select value={selectedDemoData} onChange={selectDemoDataHandler}>
          <Option value={null}>Select demo data</Option>
          <Option value="demo2">
            ESBL K. michiganensis outbreak (Chapman et al., 2020)
          </Option>
          <Option value="demo1">
            VRE ST78 outbreak (Permana et al., 2021)
          </Option>
        </Select>
      </Col>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    selectDemoData: state.selectDemoData,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
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
