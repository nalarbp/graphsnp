import { Collapse, Table } from "antd";
import React from "react";

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
