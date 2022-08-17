import { Violin } from "@ant-design/plots";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NoChart, violin_group_config } from "./util_snpDist";

const SNPDistBoxplotGroup = (props) => {
  const [data, setData] = useState(null);

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
      {data && <Violin {...violin_group_config(data)} />}
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

export default connect(mapStateToProps)(SNPDistBoxplotGroup);
