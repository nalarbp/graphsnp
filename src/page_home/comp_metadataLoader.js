import React from "react";
import { Upload, Button, message, List } from "antd";
import { StopOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { colorLUTtoStore } from "../action/colorActions";
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

  const inputList = ["Sample metadata"];
  const getInputStatus = function (item) {
    //console.log("getInputStatus");
    switch (item) {
      case "Sample metadata":
        if (props.metadata) {
          return <CheckCircleTwoTone twoToneColor="#52c41a" />;
        } else {
          return <StopOutlined />;
        }

      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <Dragger
        accept={".csv"}
        showUploadList={false}
        style={{
          height: "500px",
          backgroundColor: "white",
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
            Input metadata (csv)
          </Button>
        </div>
        <div id="input-status">
          <List
            grid={{ gutter: 4, column: 1 }}
            size="small"
            style={{ fontSize: "10px", lineHeight: "10px" }}
            dataSource={inputList}
            renderItem={(item) => (
              <List.Item style={{ backgroundColor: "white", margin: "0px" }}>
                {getInputStatus(item)} {item}
              </List.Item>
            )}
          />
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
