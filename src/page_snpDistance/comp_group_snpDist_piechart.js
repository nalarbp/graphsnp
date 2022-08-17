import { Pie } from "@ant-design/plots";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NoChart, piechart_config } from "./util_snpDist";

const SNPDistPieGroup = (props) => {
  const [data, setData] = useState(null);
  const category = props.snpDistSettings.dataColumn;

  useEffect(() => {
    setData(null);
  }, [props.metadata, props.hammingMatrix, props.snpDistSettings.dataColumn]);

  useEffect(() => {
    if (props.snpDistSettings.dataToDisplay === "all-and-group") {
      setData(props.snpDistSettings.chartsData.groupPieData);
    }
  }, [
    props.snpDistSettings.dataToDisplay,
    props.snpDistSettings.chartsData.groupPieData,
  ]);

  useEffect(() => {
    if (props.snpDistSettings.dataToDisplay === "all") {
      setData(null);
    }
  }, [props.snpDistSettings.dataToDisplay]);

  return (
    <div className="snpDist-chart-content">
      {!data && <NoChart />}
      {data && <Pie {...piechart_config(data, category)} />}
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

export default connect(mapStateToProps)(SNPDistPieGroup);
