import { QuestionCircleOutlined } from "@ant-design/icons";
import { Col, Row, Tooltip } from "antd";
import * as d3Array from "d3-array";
import React from "react";

export const ChartHeader = (props) => {
  return (
    <Row className="snpDist-chart-header">
      <Col xs={12} style={{ textAlign: "left" }}>
        <p>{props.title}</p>
      </Col>
      <Col xs={12} style={{ textAlign: "right" }}></Col>
    </Row>
  );
};

export const NoChart = () => {
  return (
    <React.Fragment>
      <p>
        No chart.{" "}
        <span>
          <Tooltip
            title="Please load the input files then create or recreate the chart using button within the settings panel"
            placement="rightTop">
            <QuestionCircleOutlined style={{ color: "red" }} />
          </Tooltip>
        </span>
      </p>
    </React.Fragment>
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

export const getGroupPieData = (meta, column) => {
  //given metadata (map) and column (str)
  //should return arr of object of count
  //[{group: 'group1', count:14}, ...]
  let meta_arr = Array.from(meta.values());
  let meta_group = d3Array.rollup(
    meta_arr,
    (v) => v.length,
    (d) => d[column]
  );
  let group_arr = [];
  meta_group.forEach((v, k) => {
    group_arr.push({ group: k, count: v });
  });
  return group_arr.length > 0 ? group_arr : null;
};

export const getGroupViolinData = (allDist, meta, column) => {
  if (!column) {
    return null;
  } else {
    let group_violin_data = [];
    let intraInter_violin_data = [];
    allDist.forEach((d) => {
      let s_col = meta.get(d.source)[column];
      let t_col = meta.get(d.target)[column];
      if (s_col === t_col) {
        group_violin_data.push({ x: s_col, y: d.value });
        intraInter_violin_data.push({ x: "intra-group", y: d.value });
      }
      if (s_col !== t_col) {
        intraInter_violin_data.push({ x: "inter-group", y: d.value });
      }
    });
    return { all: group_violin_data, intraInter: intraInter_violin_data };
  }
};

function getGroupColor(metadata, category, colLUT) {
  let lut = colLUT[category];
  let lut_dict = new Map();
  lut.forEach((v, k) => {
    if (!lut_dict.get(v)) {
      lut_dict.set(v, k);
    }
  });
  let col = {};
  lut_dict.forEach((v, k) => {
    let cat = metadata.get(v)[category];
    col[cat] = k;
  });
  return col;
}

export const barchart_config = (data) => {
  return {
    data: data,
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
};

export const violin_indv_config = (data) => {
  return {
    data: data,
    xField: "x",
    yField: "y",
    shape: "smooth-hollow",
  };
};

export const piechart_config = (data, dataColumn, colLUT, meta) => {
  let lut = getGroupColor(meta, dataColumn, colLUT);
  return {
    appendPadding: 10,
    data: data,
    angleField: "count",
    colorField: "group",
    color: ({ group }) => {
      return lut[group];
    },
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          fontSize: "12px",
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: dataColumn,
      },
    },
  };
};

export const violin_group_config = (data, dataColumn, colLUT, meta) => {
  let lut = getGroupColor(meta, dataColumn, colLUT);
  return {
    data: data,
    colorField: "x",
    color: ({ x }) => {
      return lut[x];
    },
    xField: "x",
    yField: "y",
    shape: "smooth-hollow",
  };
};
export const violin_intraInter_group_config = (data) => {
  return {
    data: data,
    xField: "x",
    yField: "y",
    shape: "smooth-hollow",
  };
};
