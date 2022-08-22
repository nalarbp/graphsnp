import { CloudDownloadOutlined } from "@ant-design/icons";
import { Violin } from "@ant-design/plots";
import { Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { NoChart, violin_indv_config } from "./util_snpDist";

const SNPDistBoxplotAll = (props) => {
  const [data, setData] = useState(null);
  const violinChart_ref = useRef();

  const downloadChart = () => {
    violinChart_ref.current?.downloadImage("all-dist-violin.png");
  };

  useEffect(() => {
    setData(null);
  }, [props.metadata, props.hammingMatrix]);

  useEffect(() => {
    setData(props.snpDistSettings.chartsData.allDistStats);
  }, [props.snpDistSettings.chartsData.allDistStats]);

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
          <Violin
            {...violin_indv_config(data)}
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
    snpDistSettings: state.snpDistSettings,
    metadata: state.metadata,
    hammingMatrix: state.hammMatrix,
  };
}

export default connect(mapStateToProps)(SNPDistBoxplotAll);
