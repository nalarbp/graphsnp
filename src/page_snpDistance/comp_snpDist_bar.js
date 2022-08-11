import { Column } from "@ant-design/plots";
import { connect } from "react-redux";

const SNPDistBar = (props) => {
  const chartsData = props.snpDistSettings.chartsData;
  const allDistData = chartsData ? chartsData.allDistData : "na";

  const config = {
    data: allDistData,
    xField: "bin", //cat: bin, 1,2,
    yField: "count", //freq of bin
    xAxis: {
      label: {
        autoRotate: false,
      },
    },
    slider: {
      start: 0,
      end: 1,
    },
  };

  return (
    <div className="snpDist-chart-content">
      {allDistData !== "na" && <Column {...config} />}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    snpDistSettings: state.snpDistSettings,
  };
}

export default connect(mapStateToProps)(SNPDistBar);
