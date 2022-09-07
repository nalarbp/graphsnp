import {
  CheckCircleFilled,
  DeleteOutlined,
  QuestionCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Button, Col, Row, Tooltip, Upload } from "antd";
import React from "react";
import Particles from "react-particles-js";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { categoricalMapToStore } from "../action/categoricalMapActions";
import { colorLUTtoStore } from "../action/colorActions";
import {
  graphClusterToStore,
  graphObjectToStore,
  hmmMatrixToStore,
} from "../action/graphMatrixActions";
import {
  isinputLoadingToStore,
  metadataToStore,
  sequenceToStore,
} from "../action/inputActions";
import {
  resetDistanceInputRelatedStates,
  resetMetadataInputRelatedStates,
} from "../utils/reset_states";
import {
  extensionCheck,
  getParticleHeight,
  getParticleWidth,
  graphSNP_desc,
  loadMetaOrMatrix,
  particleParams,
  snpsLoader,
} from "./util_home";

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
    props.categoricalMapToStore(null);
    props.colorLUTtoStore(null);
    resetMetadataInputRelatedStates();
  };

  const removeSNPHandler = () => {
    props.sequenceToStore(null);
    props.hmmMatrixToStore(null);
    props.graphObjectToStore(null);
    props.graphClusterToStore(null);
    resetDistanceInputRelatedStates();
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
          <Row id="home-input-dragger" justify="space-around" align="middle">
            <Col xs={24}>
              <Row align="center">
                <Col xs={24} md={16} xl={12} xxl={8}>
                  <p id="home-input-dragger-text-title">GraphSNP</p>
                  <p id="home-input-dragger-text-subtitle">{graphSNP_desc}</p>
                  <p id="home-input-dragger-text">
                    [Drag and drop your input file(s) here]
                  </p>
                </Col>
              </Row>
            </Col>

            <Col xs={24}>
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
                        title="The alignment file must contain a minimum of two fasta-formatted, non-gap, ATGC-exclusive nucleotide sequences of equal length (accepted file extension includes: .fa, .fasta, .fna, .mfa, .aln, .txt. A distance matrix input is a symmetric distance matrix table written in comma separated values (CSV) format (accepted file extension: .csv)."
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
                        title="A metadata table written in CSV format (accepted file extension: .csv) with mandatory column sample_id, containing ids match to alignment/matrix file. An additional column listing sample’s collection time (scaled in days, header: collection_day) is required for transmission analysis."
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
            </Col>
          </Row>
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
      graphObjectToStore,
      graphClusterToStore,
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
 */
