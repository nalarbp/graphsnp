import React, { useState, useEffect } from "react";
import { Upload, Modal, Spin, Button, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const fastaToJson = require("bio-parsers").fastaToJson;
const { Dragger } = Upload;
const loadingIcon = <LoadingOutlined style={{ fontSize: 34 }} spin />;

const InputLoader = (props) => {
  const [isProcessingInput, setisProcessingInput] = useState(false);

  async function readFastaToJSON(fastaString) {
    if (props.sequence === null) {
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
          console.log(snpsSequence);
          props.sequenceToStore(snpsSequence);
          //turn-off loading
          setisProcessingInput(false);
          //display success message
          message.success("The sequences have been loaded", 0.5);
        }
      } else {
        alert("Error: Required at least 2 sequences");
      }
      setisProcessingInput(false);
    } else {
      alert("Sequences have been loaded. Refresh to re-load a new one");
      setisProcessingInput(false);
    }
  }

  const beforeUploadHandler = (file) => {
    setisProcessingInput(true);
    if (file) {
      //turn-on loading
      setisProcessingInput(true);

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
      </Dragger>
    </React.Fragment>
  );
};
export default InputLoader;
