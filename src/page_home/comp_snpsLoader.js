import React from "react";
import { Upload, Button, message } from "antd";
import { StopOutlined, CheckCircleFilled } from "@ant-design/icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { sequenceToStore, isinputLoadingToStore } from "../action/inputActions";
import HammingMatrix from "../model/hammingMatrix_prop";
import { hmmMatrixToStore } from "../action/graphMatrixActions";

const fastaToJson = require("bio-parsers").fastaToJson;
const { Dragger } = Upload;

const InputLoader = (props) => {
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
          //display success message
          message.success(
            "The sequences have been loaded, now building distance matrix ..",
            1
          );
          setTimeout(() => {
            const hammingMatrix = new HammingMatrix(
              snpsSequence
            ).getHammingMatrix();
            message.success(
              "Pair-wise SNP distance matrix has been created",
              1
            );
            props.sequenceToStore(snpsSequence);
            props.hmmMatrixToStore(hammingMatrix);
            props.isinputLoadingToStore(false);
          }, 100);

          //load to store
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
      let inputType = "seq";

      //check extension
      //check content

      switch (inputType) {
        case "seq":
          const reader = new FileReader();
          reader.readAsText(file);
          props.isinputLoadingToStore(true);
          reader.onloadend = function (evt) {
            const dataText = evt.target.result;
            readFastaToJSON(dataText);
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
    if (props.sequence) {
      return <CheckCircleFilled style={{ fontSize: "14pt" }} />;
    } else {
      return <StopOutlined />;
    }
  };

  return (
    <React.Fragment>
      <Dragger
        accept={".fa, .fasta, .fna, .mfa"}
        showUploadList={false}
        style={{
          backgroundColor: "transparent",
          height: "500px",
        }}
        name="file"
        multiple={false}
        action="dummy-post"
        beforeUpload={beforeUploadHandler}
      >
        <div id="input-loader-snps">
          <Button id="input-loader-button-snps" shape={"round"} size={"large"}>
            {getIconStatus()} SNPs
          </Button>
        </div>
      </Dragger>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    sequence: state.sequence,
    patientMovement: state.patientMovement,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      sequenceToStore,
      isinputLoadingToStore,
      hmmMatrixToStore,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(InputLoader);

/*

        */

// Changing component state will trigger Component-Init and Component-Render
