import React from "react";
import { Upload, Button, message } from "antd";
import { StopOutlined, CheckCircleFilled } from "@ant-design/icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  patientMovementToStore,
  isinputLoadingToStore,
} from "../action/inputActions";
import { getPatientMovementInput } from "./util_inputLoaders";

const { Dragger } = Upload;

const PatientMovementInputLoader = (props) => {
  const beforeUploadHandler = (file) => {
    if (file) {
      let inputType = "patientMovement";

      //check extension
      //check content

      switch (inputType) {
        case "patientMovement":
          const reader = new FileReader();
          reader.readAsDataURL(file);
          props.isinputLoadingToStore(true);
          reader.onloadend = function (evt) {
            const dataUrl = evt.target.result;
            getPatientMovementInput(
              dataUrl,
              props.patientMovementToStore,
              props.isinputLoadingToStore
            );
          };
          break;

        default:
          message.error("Invalid input file", 0.5);
          break;
      }
    }
    return false; //to avoid upload action (we parse and load it to store instead)
  };

  const getIconStatus = function () {
    if (props.patientMovement) {
      return <CheckCircleFilled twoToneColor="#52c41a" />;
    } else {
      return <StopOutlined />;
    }
  };

  return (
    <React.Fragment>
      <Dragger
        accept={".csv"}
        showUploadList={false}
        style={{
          height: "500px",
          backgroundColor: "transparent",
        }}
        name="file"
        multiple={false}
        action="dummy-post"
        beforeUpload={beforeUploadHandler}
      >
        <div id="input-loader-patientMovement">
          <Button
            id="input-loader-button-patientMovement"
            shape={"round"}
            size={"large"}
          >
            {getIconStatus()} Stays Overlap
          </Button>
        </div>
      </Dragger>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    patientMovement: state.patientMovement,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      patientMovementToStore,
      isinputLoadingToStore,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientMovementInputLoader);

/*

        */

// Changing component state will trigger Component-Init and Component-Render
