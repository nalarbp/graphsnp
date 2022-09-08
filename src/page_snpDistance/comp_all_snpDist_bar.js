import { CloudDownloadOutlined } from "@ant-design/icons";
import { Column } from "@ant-design/plots";
import { Button } from "antd";
import React, { useRef } from "react";
import { connect } from "react-redux";
import { barchart_config, NoChart } from "./util_snpDist";

const SNPDistBarAll = (props) => {
  const barChart_ref = useRef(null);

  const downloadChart = () => {
    barChart_ref.current?.downloadImage("all-dist-bar.png");
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
          <Column
            id="all-bar-chart"
            {...barchart_config(props.chartData)}
            onReady={(plot) => {
              barChart_ref.current = plot;
            }}
          />
        </React.Fragment>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    chartData: state.chartsData.allDistData,
    metadata: state.metadata,
    hammingMatrix: state.hammMatrix,
  };
}

export default connect(mapStateToProps)(SNPDistBarAll);
