import { CloudDownloadOutlined } from "@ant-design/icons";
import { Violin } from "@ant-design/plots";
import { Button } from "antd";
import React, { useRef } from "react";
import { connect } from "react-redux";
import { NoChart, violin_indv_config } from "./util_snpDist";

const SNPDistBoxplotAll = (props) => {
  const violinChart_ref = useRef();

  const downloadChart = () => {
    violinChart_ref.current?.downloadImage("all-dist-violin.png");
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
            {...violin_indv_config(props.chartData)}
            onReady={(plot) => {
              violinChart_ref.current = plot;
            }}
          />
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

export default connect(mapStateToProps)(SNPDistBoxplotAll);
