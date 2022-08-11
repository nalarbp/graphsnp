import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { colorLUTtoStore } from "../action/colorActions";
import { categoricalMapToStore } from "../action/categoricalMapActions";
import {
  metadataToStore,
  isinputLoadingToStore,
  sequenceToStore,
} from "../action/inputActions";
import { hmmMatrixToStore } from "../action/graphMatrixActions";
import { extensionCheck, snpsLoader, loadMetaOrMatrix } from "./util_home";
import { Upload, Button, Row, Col, Tooltip } from "antd";
import {
  getParticleHeight,
  getParticleWidth,
  particleParams,
  graphSNP_desc,
} from "./util_home";
import Particles from "react-particles-js";
import {
  StopOutlined,
  CheckCircleFilled,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const { Dragger } = Upload;

const InputPlaceholder = (props) => {
  const beforeUploadHandler = (file, fileList) => {
    if (file === fileList[0] || file === fileList[1]) {
      let fileExtension = file.name.match(/\.[0-9a-z]+$/i)[0];
      let fileType = extensionCheck(fileExtension);

      if (fileType === "SNP") {
        let reader = new FileReader();
        reader.readAsText(file);
        props.isinputLoadingToStore(true);
        reader.onloadend = function (evt) {
          const dataText = evt.target.result;
          snpsLoader(
            dataText,
            props.sequenceToStore,
            props.hmmMatrixToStore,
            props.isinputLoadingToStore
          );
        };
      }

      if (fileType === "MetaOrMatrix") {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        props.isinputLoadingToStore(true);
        reader.onloadend = function (evt) {
          const dataUrl = evt.target.result;
          loadMetaOrMatrix(
            dataUrl,
            props.metadataToStore,
            props.colorLUTtoStore,
            props.categoricalMapToStore,
            props.hmmMatrixToStore,
            props.isinputLoadingToStore
          );
        };
      }
    }
    return false; //to avoid upload action (we parse and load it to store instead)
  };

  const removeMetadataHandler = () => {
    props.metadataToStore(null);
    props.colorLUTtoStore(null);
    props.categoricalMapToStore(null);
  };

  const removeSNPHandler = () => {
    props.sequenceToStore(null);
    props.hmmMatrixToStore(null);
  };

  const getIconStatus = function (type) {
    if (type === "SNP") {
      if (props.sequence || props.hammMatrix) {
        return (
          <CheckCircleFilled
            style={{ fontSize: "12px", color: "lightgreen" }}
          />
        );
      } else {
        return <StopOutlined style={{ fontSize: "12px" }} />;
      }
    }

    if (type === "Metadata") {
      if (props.metadata) {
        return (
          <CheckCircleFilled
            style={{ fontSize: "12px", color: "lightgreen" }}
          />
        );
      } else {
        return <StopOutlined style={{ fontSize: "12px" }} />;
      }
    }
  };

  return (
    <React.Fragment>
      <div id="home-input-area">
        <Particles
          params={particleParams}
          height={getParticleHeight}
          width={getParticleWidth}
          style={{ position: "absolute" }}
        />
        <Dragger
          disabled={props.hammMatrix && props.metadata ? true : false}
          accept={".csv, .fa, .fasta, .fna, .aln, .msa"}
          showUploadList={false}
          name="inputFiles"
          multiple={true}
          maxCount={2}
          action="dummy-post"
          style={{
            backgroundColor: "transparent",
            minHeight: "calc(100vh - 400px)",
            minWidth: "calc(100vw - 50px)",
          }}
          beforeUpload={beforeUploadHandler}>
          <div id="home-input-dragger">
            <Row align={"center"}>
              <Col xs={24} md={16} xl={12} xxl={8}>
                <p id="home-input-dragger-text-title">GraphSNP</p>
                <p id="home-input-dragger-text-subtitle">{graphSNP_desc}</p>
                <p id="home-input-dragger-text">
                  [Drag and drop your input file(s) here]
                </p>
              </Col>
            </Row>
            <Row id={"home-input-dragger-buttons"} align={"center"}>
              <Col xs={24} sm={8} md={7} xl={5} xxl={3}>
                <Button
                  id="home-input-button-snps"
                  shape={"round"}
                  size={"large"}
                  type={"ghost"}>
                  {getIconStatus("SNP")}Alignment/matrix{"  "}
                  <span style={{ marginLeft: "5px" }}>
                    <Tooltip
                      title="A non-ambiguous multi-fasta SNPs alignment (.fa, .fna, 
                    .mfa, .fsa) or a distance matrix (.csv) file here"
                      placement="rightTop">
                      <QuestionCircleOutlined
                        style={{ fontSize: "14px", color: "white" }}
                      />
                    </Tooltip>
                  </span>
                </Button>
                <Button
                  disabled={props.hammMatrix ? false : true}
                  title={"Remove loaded alingment/matrix"}
                  type={"ghost"}
                  style={{ backgroundColor: "transparent" }}
                  className="home-input-remove-button "
                  shape={"circle"}
                  size={"small"}
                  onClick={removeSNPHandler}>
                  <DeleteOutlined />
                </Button>
              </Col>

              <Col xs={24} sm={8} md={7} xl={5} xxl={3}>
                <Button
                  id="home-input-button-metadata"
                  shape={"round"}
                  size={"large"}
                  type={"ghost"}>
                  {getIconStatus("Metadata")} Metadata{" "}
                  <span style={{ marginLeft: "5px" }}>
                    <Tooltip
                      title="A table file (.csv) with column sample_id"
                      placement="rightTop">
                      <QuestionCircleOutlined
                        style={{ fontSize: "14px", color: "white" }}
                      />
                    </Tooltip>
                  </span>
                </Button>
                <Button
                  disabled={props.metadata ? false : true}
                  title={"Remove loaded metadata"}
                  type={"ghost"}
                  style={{ backgroundColor: "transparent" }}
                  className="home-input-remove-button "
                  shape={"circle"}
                  size={"small"}
                  onClick={removeMetadataHandler}>
                  <DeleteOutlined />
                </Button>
              </Col>
            </Row>
          </div>
        </Dragger>
      </div>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    metadata: state.metadata,
    sequence: state.sequence,
    hammMatrix: state.hammMatrix,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      sequenceToStore,
      hmmMatrixToStore,
      metadataToStore,
      colorLUTtoStore,
      isinputLoadingToStore,
      categoricalMapToStore,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(InputPlaceholder);

/*
<p id="home-input-dragger-text-title">GraphSNP</p>
<Divider style={{ opacity: 0 }} />
*/
