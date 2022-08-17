import { Column } from "@ant-design/plots";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { barchart_config, NoChart } from "./util_snpDist";

const SNPDistBarAll = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(null);
  }, [props.metadata, props.hammingMatrix]);

  useEffect(() => {
    setData(props.snpDistSettings.chartsData.allDistData);
  }, [props.snpDistSettings.chartsData.allDistData]);

  return (
    <div className="snpDist-chart-content">
      {!data && <NoChart />}
      {data && <Column {...barchart_config(data)} />}
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

export default connect(mapStateToProps)(SNPDistBarAll);
