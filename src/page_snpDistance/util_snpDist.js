import { DownloadOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import * as d3Array from "d3-array";

export const ChartHeader = (props) => {
  return (
    <Row className="snpDist-chart-header">
      <Col xs={12} style={{ textAlign: "left" }}>
        <p>{props.title}</p>
      </Col>
      <Col xs={12} style={{ textAlign: "right" }}>
        <DownloadOutlined />
      </Col>
    </Row>
  );
};

export const getAllDistData = (allDist) => {
  let dist = allDist.map((d) => d.value);
  let countMap = d3Array.rollup(
    dist,
    (v) => v.length,
    (d) => d
  );

  let all_distData = [];
  countMap.forEach(function (v, k) {
    all_distData.push({ bin: k, count: v });
  });

  let maxDist = d3Array.max(Array.from(countMap.keys()));
  for (let index = 0; index < maxDist; index++) {
    if (!countMap.get(index)) {
      all_distData.push({ bin: index, count: 0 });
    }
  }

  let all_distData_sorted = all_distData.sort(function (a, b) {
    return a.bin - b.bin;
  });

  let all_distData_fin = all_distData_sorted.map((d) => {
    return { bin: String(d.bin), count: d.count };
  });

  let all_distStats = dist.map((d) => {
    return { x: "all", y: d };
  });

  return { all_distData: all_distData_fin, all_distStats };
};
