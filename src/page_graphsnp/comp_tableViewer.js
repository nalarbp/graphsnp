import React from "react";
import { Row, Col, Collapse, Table } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const { Panel } = Collapse;
const _ = require("lodash");
const TableViewer = (props) => {
  //Only need props.metadata: and must always available and props.selectedNode
  //GLOBAL VAR
  //STATES
  //SETTINGS
  //HANDLERS
  //DATA FOR TABLE
  const selectedNodeList =
    props.selectedNode && props.selectedNode.length > 0
      ? props.selectedNode.map((n) => props.metadata.get(n))
      : [];
  let columns = [];
  let dataSource = [];
  selectedNodeList.forEach((d) => {
    let keyIndexFoUniq = 0;
    for (const [k, v, i] of Object.entries(d)) {
      console.log(i);
      //column
      columns.push({
        title: k,
        dataIndex: k,
        key: k + keyIndexFoUniq.toString(),
      });
      //datasource
      let dataInIndex = dataSource[keyIndexFoUniq]
        ? _.cloneDeep(dataSource[keyIndexFoUniq])
        : {};
      dataInIndex["key"] = keyIndexFoUniq.toString();
      dataInIndex[k] = v;
      dataSource.push(dataInIndex);
      keyIndexFoUniq = keyIndexFoUniq + 1;
    }
  });

  console.log("tableViwer");
  console.log("selectedNode", props.selectedNode);
  console.log("datasource", dataSource);

  return (
    <React.Fragment>
      {props.selectedNode && (
        <Table
          style={{ width: "100%" }}
          dataSource={dataSource}
          columns={columns}
        />
      )}

      {!props.selectedNode && <p>No selected node</p>}
    </React.Fragment>
  );
};

export default TableViewer;

/*

*/