import React, { useState, useEffect } from "react";
import { Upload, Modal, Spin, Button, message, List } from "antd";
import {
  StopOutlined,
  LoadingOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";

const fastaToJson = require("bio-parsers").fastaToJson;
const { Dragger } = Upload;
const loadingIcon = <LoadingOutlined style={{ fontSize: 34 }} spin />;

const InputLoader = (props) => {
  //console.log("Input Loader - init");
  const [isProcessingInput, setisProcessingInput] = useState(false);

  async function readFastaToJSON(fastaString) {
    if (props.sequence === null) {
      //console.log("async");
      //turn-on loading
      setisProcessingInput(true);
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
          //turn-off loading
          //setisProcessingInput(false);
          //display success message
          message.success("The sequences have been loaded", 0.5);
        }
      } else {
        alert("Error: Required at least 2 sequences");
      }
      setisProcessingInput(false);
    } else {
      alert("Sequences have been loaded. Refresh to re-load a new one");
    }
  }

  const beforeUploadHandler = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onloadend = function (evt) {
        const dataText = evt.target.result;
        // read here
        readFastaToJSON(dataText);
        // when done turn-off loading
      };
    }
    return false; //to avoid upload action (we parse and load it to store instead)
  };

  const inputList = ["SNPs sequence", "Collection dates", "Exposure period"];
  const getInputStatus = function (item) {
    //console.log("getInputStatus");
    switch (item) {
      case "SNPs sequence":
        if (props.sequence) {
          return <CheckCircleTwoTone twoToneColor="#52c41a" />;
        } else {
          return <StopOutlined />;
        }
      case "Collection dates":
        if (props.sequence && props.collectionDates) {
          return <CheckCircleTwoTone twoToneColor="#52c41a" />;
        } else {
          return <StopOutlined />;
        }
      case "Exposure period":
        if (props.sequence && props.exposurePeriod) {
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
      <Modal
        visible={isProcessingInput}
        closable={false}
        centered={true}
        width={0}
        footer={null}
        bodyStyle={{
          textAlign: "center",
          backgroundColor: "teal",
          padding: "0px",
        }}
      >
        <Spin
          indicator={loadingIcon}
          style={{ color: "white" }}
          tip="Processing..."
          size="large"
        />
      </Modal>

      <Dragger
        accept={".fa"}
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
        <div id="input-loader">
          <Button id="input-loader-button" shape={"round"} size={"large"}>
            Drag and drop your input file(s) here
          </Button>
        </div>
        <div id="input-status">
          <List
            grid={{ gutter: 4, column: 3 }}
            size="small"
            style={{ fontSize: "10px", lineHeight: "3px" }}
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
export default InputLoader;

/*

        */

// Changing component state will trigger Component-Init and Component-Render
