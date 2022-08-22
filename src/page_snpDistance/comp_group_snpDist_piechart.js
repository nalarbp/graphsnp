import { CloudDownloadOutlined } from "@ant-design/icons";
import { Pie } from "@ant-design/plots";
import { Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { NoChart, piechart_config } from "./util_snpDist";

const SNPDistPieGroup = (props) => {
  const [data, setData] = useState(null);
  const category = props.snpDistSettings.dataColumn;

  const group_pieChart_ref = useRef();

  const downloadChart = () => {
    group_pieChart_ref.current?.downloadImage("grouped-dist-pie.png");
  };

  useEffect(() => {
    setData(null);
  }, [props.metadata, props.hammingMatrix, props.snpDistSettings.dataColumn]);

  useEffect(() => {
    if (props.snpDistSettings.dataToDisplay === "all-and-group") {
      setData(props.snpDistSettings.chartsData.groupPieData);
    }
  }, [
    props.snpDistSettings.dataToDisplay,
    props.snpDistSettings.chartsData.groupPieData,
  ]);

  useEffect(() => {
    if (props.snpDistSettings.dataToDisplay === "all") {
      setData(null);
    }
  }, [props.snpDistSettings.dataToDisplay]);

  return (
    <div className="snpDist-chart-content">
      {!data && <NoChart />}
      {data && (
        <React.Fragment>
          <Button
            disabled={data ? false : true}
            size="small"
            className="snpDist-chart-download-button"
            onClick={downloadChart}>
            <CloudDownloadOutlined />
          </Button>
          <Pie
            {...piechart_config(data, category, props.colLUT, props.metadata)}
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
    snpDistSettings: state.snpDistSettings,
    metadata: state.metadata,
    hammingMatrix: state.hammMatrix,
    colLUT: state.colorLUT,
  };
}

export default connect(mapStateToProps)(SNPDistPieGroup);
