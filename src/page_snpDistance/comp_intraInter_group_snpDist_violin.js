import { CloudDownloadOutlined } from "@ant-design/icons";
import { Violin } from "@ant-design/plots";
import { Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { NoChart, violin_intraInter_group_config } from "./util_snpDist";

const SNPDistBoxplotIntraInterGroup = (props) => {
  const [data, setData] = useState(null);

  const intraInter_violinChart_ref = useRef();

  const downloadChart = () => {
    intraInter_violinChart_ref.current?.downloadImage(
      "intraInterGroup-dist-violin.png"
    );
  };

  useEffect(() => {
    setData(null);
  }, [props.metadata, props.hammingMatrix, props.snpDistSettings.dataColumn]);

  useEffect(() => {
    if (props.snpDistSettings.dataToDisplay === "all-and-group") {
      setData(props.snpDistSettings.chartsData.groupDistIntraInter);
    }
  }, [
    props.snpDistSettings.chartsData.groupDistIntraInter,
    props.snpDistSettings.dataToDisplay,
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
          <Violin
            {...violin_intraInter_group_config(data)}
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
    snpDistSettings: state.snpDistSettings,
    metadata: state.metadata,
    hammingMatrix: state.hammMatrix,
  };
}

export default connect(mapStateToProps)(SNPDistBoxplotIntraInterGroup);
