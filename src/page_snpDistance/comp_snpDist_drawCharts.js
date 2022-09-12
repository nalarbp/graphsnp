import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  chart_changeAllDistData,
  chart_changeAllDistStats,
  chart_changeGroupDistIntraInter,
  chart_changeGroupDistStats,
  chart_changeGroupPieData,
} from "../action/chartDataActions";
import GraphEdgeList from "../model/graphEdgeList_prop";
import {
  getAllDistData,
  getGroupPieData,
  getGroupViolinData,
} from "./util_snpDist";

const DrawSNPdistCharts = (props) => {
  const createAndDrawChartsHandler = () => {
    //global var
    let edgeList = [];
    let nodeList = [];
    props.hammingMatrix.forEach((v, k) => {
      nodeList.push(k);
      edgeList = edgeList.concat(v);
    });
    let allDist = new GraphEdgeList(nodeList, edgeList).getSymetricEdges()
      .edges;

    if (!props.chartsData.allDistData) {
      let allDistData = getAllDistData(allDist);
      props.chart_changeAllDistData(allDistData.all_distData);
      props.chart_changeAllDistStats(allDistData.all_distStats);
    }

    if (!props.chartsData.groupPieData) {
      let groupPieData =
        props.metadata &&
        props.snpDistSettings.dataColumn &&
        props.snpDistSettings.dataToDisplay !== "all"
          ? getGroupPieData(props.metadata, props.snpDistSettings.dataColumn)
          : null;
      props.chart_changeGroupPieData(groupPieData);
    }

    if (!props.chartsData.groupDistIntraInter) {
      let groupViolinData =
        props.metadata &&
        props.snpDistSettings.dataColumn &&
        props.snpDistSettings.dataToDisplay !== "all"
          ? getGroupViolinData(
              allDist,
              props.metadata,
              props.snpDistSettings.dataColumn
            )
          : { all: null, intraInter: null };
      props.chart_changeGroupDistStats(groupViolinData.all);
      props.chart_changeGroupDistIntraInter(groupViolinData.intraInter);
    }
  };

  return (
    <React.Fragment>
      <h5>
        Draw charts{" "}
        <span>
          <Tooltip
            title="Click the button to start drawing charts."
            placement="rightTop">
            <QuestionCircleOutlined style={{ color: "red" }} />
          </Tooltip>
        </span>
      </h5>
      <Button
        disabled={props.hammingMatrix ? false : true}
        onClick={createAndDrawChartsHandler}
        type="primary">
        Draw chart(s)
      </Button>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    chartsData: state.chartsData,
    snpDistSettings: state.snpDistSettings,
    hammingMatrix: state.hammMatrix,
    metadata: state.metadata,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      chart_changeAllDistData,
      chart_changeAllDistStats,
      chart_changeGroupPieData,
      chart_changeGroupDistStats,
      chart_changeGroupDistIntraInter,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawSNPdistCharts);
