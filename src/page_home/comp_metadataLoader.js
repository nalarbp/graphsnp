import React from "react";
import { Upload, Button, message } from "antd";
import { StopOutlined, CheckCircleFilled } from "@ant-design/icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { colorLUTtoStore } from "../action/colorActions";
import { categoricalMapToStore } from "../action/categoricalMapActions";
import { metadataToStore, isinputLoadingToStore } from "../action/inputActions";
import { getMetadataInput } from "./util_inputLoaders";
const { Dragger } = Upload;

const MetadataInputLoader = (props) => {
  //console.log("Input Loader - init");
  const beforeUploadHandler = (file) => {
    if (file) {
      let inputType = "metadata";
      //check extension
      //check content
      switch (inputType) {
        case "metadata":
          const reader = new FileReader();
          reader.readAsDataURL(file);
          props.isinputLoadingToStore(true);
          reader.onloadend = function (evt) {
            const dataUrl = evt.target.result;
            getMetadataInput(
              dataUrl,
              props.metadataToStore,
              props.colorLUTtoStore,
              props.categoricalMapToStore,
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
    if (props.metadata) {
      return <CheckCircleFilled style={{ fontSize: "14pt" }} />;
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
        <div id="input-loader-metadata">
          <Button
            id="input-loader-button-metadata"
            shape={"round"}
            size={"large"}
          >
            {getIconStatus()} Metadata
          </Button>
        </div>
      </Dragger>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    metadata: state.metadata,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      metadataToStore,
      colorLUTtoStore,
      isinputLoadingToStore,
      categoricalMapToStore,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MetadataInputLoader);

/*

        */

// Changing component state will trigger Component-Init and Component-Render
