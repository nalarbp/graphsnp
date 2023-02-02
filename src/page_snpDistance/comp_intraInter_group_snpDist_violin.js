import { CloudDownloadOutlined } from "@ant-design/icons";
import { Violin } from "@ant-design/plots";
import { Button } from "antd";
import React, { useRef } from "react";
import { connect } from "react-redux";
import {
  downloadSVGchart,
  NoChart,
  violin_intraInter_group_config,
} from "./util_snpDist";

const SNPDistBoxplotIntraInterGroup = (props) => {
  const intraInter_violinChart_ref = useRef();

  const downloadHandler = () => {
    let ref = intraInter_violinChart_ref.current;
    let id = "intra_inter_group_violin";
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
            <CloudDownloadOutlined />
          </Button>
          <div ref={intraInter_violinChart_ref}>
            <Violin {...violin_intraInter_group_config(props.chartData)} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    chartData: state.chartsData.groupDistIntraInter,
    metadata: state.metadata,
    hammingMatrix: state.hammMatrix,
  };
}

export default connect(mapStateToProps)(SNPDistBoxplotIntraInterGroup);
