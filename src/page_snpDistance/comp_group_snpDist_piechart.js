import { CloudDownloadOutlined } from "@ant-design/icons";
import { Pie } from "@ant-design/plots";
import { Button } from "antd";
import React, { useRef } from "react";
import { connect } from "react-redux";
import { NoChart, piechart_config } from "./util_snpDist";

const SNPDistPieGroup = (props) => {
  const category = props.dataColumn;
  const group_pieChart_ref = useRef();

  const downloadChart = () => {
    group_pieChart_ref.current?.downloadImage("grouped-dist-pie.png");
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
          <Pie
            {...piechart_config(
              props.chartData,
              category,
              props.colLUT,
              props.metadata
            )}
            onReady={(plot) => {
              group_pieChart_ref.current = plot;
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
    chartData: state.chartsData.groupPieData,
    metadata: state.metadata,
    hammingMatrix: state.hammMatrix,
    colLUT: state.colorLUT,
  };
}

export default connect(mapStateToProps)(SNPDistPieGroup);
