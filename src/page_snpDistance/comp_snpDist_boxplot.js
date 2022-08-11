import { Violin } from "@ant-design/plots";
import { connect } from "react-redux";

const SNPDistBoxplot = (props) => {
  const chartsData = props.snpDistSettings.chartsData;
  const allDistStats = chartsData ? chartsData.allDistStats : "na";

  const dummyData = [
    { x: "all", y: 2 },
    { x: "all", y: 4 },
    { x: "all", y: 6 },
    { x: "all", y: 3 },
  ];
  console.log(dummyData);
  const config = {
    data: allDistStats,
    xField: "x",
    yField: "y",
    shape: "smooth-hollow",
  };

  return (
    <div className="snpDist-chart-content">
      {allDistStats !== "na" && <Violin {...config} />}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    snpDistSettings: state.snpDistSettings,
  };
}

export default connect(mapStateToProps)(SNPDistBoxplot);
