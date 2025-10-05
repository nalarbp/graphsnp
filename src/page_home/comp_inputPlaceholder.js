import {
  CheckCircleFilled,
  DeleteOutlined,
  QuestionCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Button, Col, Row, Tooltip, Upload } from "antd";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { categoricalMapToStore } from "../action/categoricalMapActions";
import {
  chart_changeAllDistData,
  chart_changeAllDistStats,
  chart_changeGroupDistIntraInter,
  chart_changeGroupDistStats,
  chart_changeGroupPieData,
} from "../action/chartDataActions";
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
  graphSNP_desc,
  loadMetaOrMatrix,
  snpsLoader,
} from "./util_home";

const { Dragger } = Upload;

const InputPlaceholder = (props) => {
  const beforeUploadHandler = (file, fileList) => {
    if (file === fileList[0] || file === fileList[1]) {
      let fileExtension = file.name.match(/\.[0-9a-z]+$/i)[0].toLowerCase();
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
    props.chart_changeAllDistData(null);
    props.chart_changeAllDistStats(null);
    props.chart_changeGroupPieData(null);
    props.chart_changeGroupDistStats(null);
    props.chart_changeGroupDistIntraInter(null);
    resetMetadataInputRelatedStates();
  };

  const removeSNPHandler = () => {
    props.sequenceToStore(null);
    props.hmmMatrixToStore(null);
    props.graphObjectToStore(null);
    props.graphClusterToStore(null);
    props.chart_changeAllDistData(null);
    props.chart_changeAllDistStats(null);
    props.chart_changeGroupPieData(null);
    props.chart_changeGroupDistStats(null);
    props.chart_changeGroupDistIntraInter(null);
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
        <Row justify="center">
          <Col xs={24}>
            <p id="home-input-dragger-text-title">GraphSNP</p>
            <p id="home-input-dragger-text-subtitle">{graphSNP_desc}</p>
            <p id="home-input-dragger-text">
              [Drag and drop input files here and click either Distances
              or Graph to start visualising]
            </p>
          </Col>
        </Row>
        {/* Below is the row containing two columns side by side (when small they are stacked on top of each other). each column contains a Dragger component. One for SNPs alignment and the other for metadata. */}
        <Row justify="center" gutter={[16, 16]}>
          <Col xs={24} sm={10}>
            <Dragger
              disabled={props.sequence || props.hammMatrix ? true : false}
              showUploadList={false}
              name="file"
              multiple={false}
              style={{ backgroundColor: "transparent", minHeight: "300px", borderRadius: "10px" }}
              action="dummy-post"
              beforeUpload={beforeUploadHandler}>
              <div id="home-input-dragger-snps">
                <Button
                  id="home-input-button-snps"
                  shape={"round"}
                  size={"large"}
                  type={"ghost"}>
                  {getIconStatus("SNP")}Alignment/matrix{"  "}
                  <span style={{ marginLeft: "5px" }}>
                    <Tooltip
                      title="The alignment file must contain a minimum of two fasta-formatted nucleotide sequences of equal length (accepted file extension includes: .fa, .fasta, .fna, .mfa, .aln, .txt. A distance matrix input is a symmetric distance matrix table written in comma separated values (CSV) format (accepted file extension: .csv)."
                      placement="rightTop">
                      <QuestionCircleOutlined
                        style={{ fontSize: "14px", color: "white" }}
                      />
                    </Tooltip>
                  </span>
                </Button>
                <Button
                  disabled={props.hammMatrix ? false : true}
                  title={"Remove loaded SNPs alignment"}
                  type={"ghost"}
                  style={{ backgroundColor: "transparent" }}
                  className="home-input-remove-button "
                  shape={"circle"}
                  size={"small"}
                  onClick={removeSNPHandler}>
                  <DeleteOutlined />
                </Button>
              </div>
            </Dragger>
          </Col>

          <Col xs={24} sm={10}>
            <Dragger
              disabled={props.metadata ? true : false}
              showUploadList={false}
              style={{ backgroundColor: "transparent", minHeight: "300px", borderRadius: "10px" }}
              name="file"
              multiple={false}
              action="dummy-post"
              beforeUpload={beforeUploadHandler}>
              <div id="home-input-dragger-metadata">
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
              </div>
            </Dragger>

          </Col>
        </Row>
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
      chart_changeAllDistData,
      chart_changeAllDistStats,
      chart_changeGroupPieData,
      chart_changeGroupDistStats,
      chart_changeGroupDistIntraInter,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(InputPlaceholder);

/*
<Particles
          params={particleParams}
          height={getParticleHeight}
          width={getParticleWidth}
          style={{ position: "absolute" }}
        />
 */
