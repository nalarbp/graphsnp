import { CloudDownloadOutlined } from "@ant-design/icons";
import { Violin } from "@ant-design/plots";
import { Button } from "antd";
import React, { useRef } from "react";
import { connect } from "react-redux";
import { downloadSVGchart, NoChart, violin_group_config } from "./util_snpDist";

const SNPDistBoxplotGroup = (props) => {
  const grouped_violinChart_ref = useRef();

  const downloadHandler = () => {
    let ref = grouped_violinChart_ref.current;
    let id = "grouped_violin";
    downloadSVGchart(ref, id);
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
            onClick={downloadHandler}>
            <CloudDownloadOutlined title="Download SVG" />
          </Button>
          <div ref={grouped_violinChart_ref}>
            <Violin
              {...violin_group_config(
                props.chartData,
                props.dataColumn,
                props.colLUT,
                props.metadata
              )}
            />
          </div>
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
