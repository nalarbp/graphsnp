import { ZoomInOutlined } from "@ant-design/icons";
import { Column } from "@ant-design/plots";
import { Button } from "antd";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { dist_changeIsModalOpen } from "../action/snpdistSettingsActions";
import { barchart_config, NoChart } from "./util_snpDist";

const SNPDistBarAll = (props) => {
  const showModal = () => {
    let toModal = {
      visible: true,
      chartSettings: barchart_config(props.chartData),
      chartType: "column",
    };
    props.dist_changeIsModalOpen(toModal);
  };

  const barChart_settings = () => {
    let new_config = barchart_config(props.chartData);
    return new_config;
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
            onClick={showModal}>
            <ZoomInOutlined title="Render in higher resolution, and download SVG" />
          </Button>
          <Column id="all-bar-chart" {...barChart_settings()} />
        </React.Fragment>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    chartData: state.chartsData.allDistData,
    metadata: state.metadata,
    hammingMatrix: state.hammMatrix,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ dist_changeIsModalOpen }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SNPDistBarAll);

/*

*/
