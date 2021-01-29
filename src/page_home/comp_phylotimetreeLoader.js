import React from "react";
import { Upload, Button, message, List } from "antd";
import { StopOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { metadataToStore, isinputLoadingToStore } from "../action/inputActions";

const fastaToJson = require("bio-parsers").fastaToJson;
const { Dragger } = Upload;

const PhyloTimeTreeInputLoader = (props) => {
  //console.log("Input Loader - init");

  async function readFastaToJSON(fastaString) {
    if (props.sequence === null) {
      //console.log("async");
      const sequenceJSON = await fastaToJson(fastaString);
      const snpsSequence = [];
      if (Array.isArray(sequenceJSON) && sequenceJSON.length > 1) {
        //console.log(sequenceJSON);
        //check all error message, alert, and no seq to store
        let isolateName = {};
        let seqLen = [];
        let noErr = true;
        for (let index = 0; index < sequenceJSON.length; index++) {
          let messages = sequenceJSON[index].messages;
          let parsedSequence = sequenceJSON[index].parsedSequence;
          let success = sequenceJSON[index].success;
          //tracking size
          if (seqLen.indexOf(parsedSequence.size) === -1) {
            seqLen.push(parsedSequence.size);
          }
          //check success parsing
          if (!success) {
            noErr = false;
            alert("Parsing error:", parsedSequence.name);
            break;
          }
          //check err messages
          if (messages.length > 0) {
            noErr = false;
            alert(messages[0]);
            break;
          }
          //check sequence length
          if (seqLen.length > 1) {
            noErr = false;
            alert("Size error: Alignment required sequence with same length");
            break;
          }
          //check duplicated isolate
          if (!isolateName[parsedSequence.name]) {
            isolateName[parsedSequence.name] = true;
          } else {
            noErr = false;
            alert("Sequence error: Duplicated sequence");
            break;
          }
          //making snpsSequence
          if (noErr) {
            snpsSequence.push({
              id: parsedSequence.name,
              size: parsedSequence.size,
              sequence: parsedSequence.sequence.toLowerCase(),
            });
          }
        }

        if (noErr) {
          //load to store
          props.sequenceToStore(snpsSequence);
          //props.isinputLoadingToStore(false);
          //display success message
          message.success("The sequences have been loaded", 2);
        }
      } else {
        alert("Error: Required at least 2 sequences");
      }
    } else {
      alert("Sequences have been loaded. Refresh to re-load a new one");
    }
  }

  const beforeUploadHandler = (file) => {
    if (file) {
      let inputType = "phyloTimeTree";

      //check extension
      //check content

      switch (inputType) {
        case "phyloTimeTree":
          const reader = new FileReader();
          reader.readAsText(file);
          props.isinputLoadingToStore(true);
          reader.onloadend = function (evt) {
            const dataText = evt.target.result;
            readFastaToJSON(dataText);
            props.isinputLoadingToStore(false);
          };
          break;

        default:
          message.error("Invalid input file", 0.5);
          break;
      }
    }
    return false; //to avoid upload action (we parse and load it to store instead)
  };

  const inputList = ["Phylogenetic time tree"];
  const getInputStatus = function (item) {
    //console.log("getInputStatus");
    switch (item) {
      case "Phylogenetic time tree":
        if (props.sequence && props.metadata) {
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
        <div id="input-loader-phyloTimeTree">
          <Button
            id="input-loader-button-phyloTimeTree"
            shape={"round"}
            size={"large"}
          >
            Input Time Tree (tree)
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
      isinputLoadingToStore,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhyloTimeTreeInputLoader);

/*

        */

// Changing component state will trigger Component-Init and Component-Render
