import { CloudDownloadOutlined } from "@ant-design/icons";
import { Violin } from "@ant-design/plots";
import { Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { NoChart, violin_group_config } from "./util_snpDist";

const SNPDistBoxplotGroup = (props) => {
  const [data, setData] = useState(null);
  const category = props.snpDistSettings.dataColumn;

  const grouped_violinChart_ref = useRef();

  const downloadChart = () => {
    grouped_violinChart_ref.current?.downloadImage("grouped-dist-violin.png");
  };

  useEffect(() => {
    setData(null);
  }, [props.metadata, props.hammingMatrix, props.snpDistSettings.dataColumn]);

  useEffect(() => {
    if (props.snpDistSettings.dataToDisplay === "all-and-group") {
      setData(props.snpDistSettings.chartsData.groupViolinData);
    }
  }, [props.snpDistSettings.chartsData.groupViolinData]);

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
          <Violin
            {...violin_group_config(
              data,
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
    snpDistSettings: state.snpDistSettings,
    metadata: state.metadata,
    hammingMatrix: state.hammMatrix,
    colLUT: state.colorLUT,
  };
}

export default connect(mapStateToProps)(SNPDistBoxplotGroup);