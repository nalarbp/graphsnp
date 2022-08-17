import { Violin } from "@ant-design/plots";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NoChart, violin_indv_config } from "./util_snpDist";

const SNPDistBoxplotAll = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(null);
  }, [props.metadata, props.hammingMatrix]);

  useEffect(() => {
    setData(props.snpDistSettings.chartsData.allDistStats);
  }, [props.snpDistSettings.chartsData.allDistStats]);

  return (
    <div className="snpDist-chart-content">
      {!data && <NoChart />}
      {data && <Violin {...violin_indv_config(data)} />}
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

export default connect(mapStateToProps)(SNPDistBoxplotAll);
