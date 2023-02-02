import { CloudDownloadOutlined } from "@ant-design/icons";
import { Pie } from "@ant-design/plots";
import { Button } from "antd";
import React, { useRef } from "react";
import { connect } from "react-redux";
import { downloadSVGchart, NoChart, piechart_config } from "./util_snpDist";

const SNPDistPieGroup = (props) => {
  const group_pieChart_ref = useRef();

  const downloadHandler = () => {
    let ref = group_pieChart_ref.current;
    let id = "grouping_variable";
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
          <div ref={group_pieChart_ref}>
            <Pie
              {...piechart_config(
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
    chartData: state.chartsData.groupPieData,
    metadata: state.metadata,
    hammingMatrix: state.hammMatrix,
    colLUT: state.colorLUT,
  };
}

export default connect(mapStateToProps)(SNPDistPieGroup);
