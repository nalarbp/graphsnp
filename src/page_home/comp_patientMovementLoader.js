import React from "react";
import { Upload, Button, message, Tooltip } from "antd";
import {
  StopOutlined,
  CheckCircleFilled,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
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

  const removeStayTimelineHandler = (val) => {
    props.patientMovementToStore(null);
  };

  return (
    <React.Fragment>
      <div>
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
              {getIconStatus()} Patient stay timeline{" "}
              <span style={{ marginLeft: "5px" }}>
                <Tooltip
                  title="Input or drag and drop patient stay timeline (CSV) here"
                  placement="rightTop"
                >
                  <QuestionCircleOutlined
                    style={{ fontSize: "14px", color: "white" }}
                  />
                </Tooltip>
              </span>
            </Button>
          </div>
        </Dragger>
        <div className="remove-button-container">
          <Button
            disabled={props.patientMovement ? false : true}
            title={"Remove loaded timeline"}
            type={"ghost"}
            className="input-loader-remove-button "
            shape={"circle"}
            size={"small"}
            onClick={removeStayTimelineHandler}
          >
            <DeleteOutlined />
          </Button>
        </div>
      </div>
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
