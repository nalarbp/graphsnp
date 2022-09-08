import { CloudDownloadOutlined } from "@ant-design/icons";
import { Violin } from "@ant-design/plots";
import { Button } from "antd";
import React, { useRef } from "react";
import { connect } from "react-redux";
import { NoChart, violin_group_config } from "./util_snpDist";

const SNPDistBoxplotGroup = (props) => {
  const category = props.dataColumn;
  const grouped_violinChart_ref = useRef();

  const downloadChart = () => {
    grouped_violinChart_ref.current?.downloadImage("grouped-dist-violin.png");
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
            {...violin_group_config(
              props.chartData,
              category,
              props.colLUT,
              props.metadata
            )}
            onReady={(plot) => {
              grouped_violinChart_ref.current = plot;
            }}
          />
        </React.Fragment>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    dataColumn: state.snpDistSettings.dataColumn,
    chartData: state.chartsData.groupDistStats,
    metadata: state.metadata,
    hammingMatrix: state.hammMatrix,
    colLUT: state.colorLUT,
  };
}

export default connect(mapStateToProps)(SNPDistBoxplotGroup);
