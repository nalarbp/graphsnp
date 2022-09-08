import { CloudDownloadOutlined } from "@ant-design/icons";
import { Violin } from "@ant-design/plots";
import { Button } from "antd";
import React, { useRef } from "react";
import { connect } from "react-redux";
import { NoChart, violin_intraInter_group_config } from "./util_snpDist";

const SNPDistBoxplotIntraInterGroup = (props) => {
  const intraInter_violinChart_ref = useRef();
  const downloadChart = () => {
    intraInter_violinChart_ref.current?.downloadImage(
      "intraInterGroup-dist-violin.png"
    );
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
            onClick={downloadChart}>
            <CloudDownloadOutlined />
          </Button>
          <Violin
            {...violin_intraInter_group_config(props.chartData)}
            onReady={(plot) => {
              intraInter_violinChart_ref.current = plot;
            }}
          />
        </React.Fragment>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    chartData: state.chartsData.groupDistIntraInter,
    metadata: state.metadata,
    hammingMatrix: state.hammMatrix,
  };
}

export default connect(mapStateToProps)(SNPDistBoxplotIntraInterGroup);
