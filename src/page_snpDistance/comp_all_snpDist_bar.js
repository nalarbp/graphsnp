import { CloudDownloadOutlined } from "@ant-design/icons";
import { Column } from "@ant-design/plots";
import { Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { barchart_config, NoChart } from "./util_snpDist";

const SNPDistBarAll = (props) => {
  const [data, setData] = useState(null);
  const barChart_ref = useRef();

  const downloadChart = () => {
    barChart_ref.current?.downloadImage("all-dist-bar.png");
  };

  useEffect(() => {
    setData(null);
  }, [props.metadata, props.hammingMatrix]);

  useEffect(() => {
    setData(props.snpDistSettings.chartsData.allDistData);
  }, [props.snpDistSettings.chartsData.allDistData]);

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
          <Column
            {...barchart_config(data)}
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
    snpDistSettings: state.snpDistSettings,
    metadata: state.metadata,
    hammingMatrix: state.hammMatrix,
  };
}

export default connect(mapStateToProps)(SNPDistBarAll);
