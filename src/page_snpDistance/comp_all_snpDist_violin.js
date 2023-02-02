import { CloudDownloadOutlined } from "@ant-design/icons";
import { Violin } from "@ant-design/plots";
import { Button } from "antd";
import React, { useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { dist_changeIsModalOpen } from "../action/snpdistSettingsActions";
import { downloadSVGchart, NoChart, violin_indv_config } from "./util_snpDist";

const SNPDistBoxplotAll = (props) => {
  const all_violinChart_ref = useRef();

  const downloadHandler = () => {
    let ref = all_violinChart_ref.current;
    let id = "all_samples_violin";
    downloadSVGchart(ref, id);
  };

  return (
    <div className="snpDist-chart-content">
      {!props.chartData && <NoChart />}
      {props.chartData && (
        <React.Fragment>
          <Button
            disabled={props.chartData ? false : true}
            size="small"
            className="snpDist-chart-download-button"
            onClick={downloadHandler}>
            <CloudDownloadOutlined title="Download SVG" />
          </Button>
          <div ref={all_violinChart_ref}>
            <Violin {...violin_indv_config(props.chartData)} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    chartData: state.chartsData.allDistStats,
    metadata: state.metadata,
    hammingMatrix: state.hammMatrix,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ dist_changeIsModalOpen }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SNPDistBoxplotAll);
