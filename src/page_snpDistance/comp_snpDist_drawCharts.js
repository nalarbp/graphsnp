import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { dist_changeChartsData } from "../action/snpdistSettingsActions";
import GraphEdgeList from "../model/graphEdgeList_prop";
import { getAllDistData } from "./util_snpDist";

const DrawSNPdistCharts = (props) => {
  const metadata_arr = props.metadata
    ? Array.from(props.metadata.values())
    : null;

  const dataToDisplay = props.snpDistSettings.dataToDisplay;
  const dataColumn = props.snpDistSettings.dataColumn;

  const createAndDrawChartsHandler = () => {
    let edgeList = [];
    let nodeList = [];
    props.hammingMatrix.forEach((v, k) => {
      nodeList.push(k);
      edgeList = edgeList.concat(v);
    });
    let allDist = new GraphEdgeList(nodeList, edgeList).getSymetricEdges()
      .edges;

    //all data fun
    let allDistData = getAllDistData(allDist);

    //group data fun group

    let chartsData = {
      allDistData: allDistData.all_distData,
      allDistStats: allDistData.all_distStats,
      groupDistData: null,
      groupDistStats: null,
    };
    props.dist_changeChartsData(chartsData);
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
    snpDistSettings: state.snpDistSettings,
    hammingMatrix: state.hammMatrix,
    metadata: state.metadata,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ dist_changeChartsData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawSNPdistCharts);
