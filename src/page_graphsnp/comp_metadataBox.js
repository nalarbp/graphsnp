import { TableOutlined } from "@ant-design/icons";
import { Col, Collapse, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeSelectedNode } from "../action/graphSettingsActions";

const { Panel } = Collapse;
const MetadataBox = (props) => {
  //STATES
  const [dataTable, setdataTable] = useState({
    columns: null,
    cells: null,
  });

  //USEEFFECTS
  useEffect(() => {
    if (props.metadata) {
      //console.log(props.selectedNode);
      if (props.selectedNode.length >= 1) {
        //console.log(props.selectedNode);
        let selectedNodeList = [];
        props.selectedNode.forEach((n) => {
          if (props.metadata.get(n)) {
            selectedNodeList.push(props.metadata.get(n));
          }
        });

        if (selectedNodeList.length >= 1) {
          let columns = [];
          Object.keys(selectedNodeList[0]).forEach((d, idx) => {
            columns.push({
              title: d,
              dataIndex: d,
              key: d + idx.toString(),
            });
          });

          selectedNodeList.forEach((d, idx) => {
            d["key"] = idx;
          });
          //console.log(columns, dataSource);

          //clear up columns
          let columns_filtered = columns.filter((c) => {
            if (c.dataIndex.includes(":color") || c.dataIndex.includes("key")) {
              return false;
            } else {
              return true;
            }
          });

          setdataTable({
            columns: columns_filtered,
            cells: selectedNodeList,
          });
        } else {
          setdataTable({
            columns: null,
            cells: null,
          });
        }
      } else {
        setdataTable({
          columns: null,
          cells: null,
        });
      }
    }
  }, [props.selectedNode]);

  return (
    <React.Fragment>
      <div id="metadata-box">
        {props.metadata && props.graphObject && (
          <Row style={{ paddingBottom: "0px" }}>
            <Col span={24}>
              <Collapse accordion bordered={false} expandIconPosition="left">
                <Panel
                  style={{
                    marginBottom: "0px",
                    textAlign: "left",
                    overflowY: "auto",
                  }}
                  header={
                    <p style={{ marginBottom: "0px" }}>
                      <TableOutlined /> Selected node metadata
                    </p>
                  }
                  key="1">
                  {props.selectedNode &&
                    props.graphObject &&
                    dataTable.columns && (
                      <Table
                        size="small"
                        pagination={false}
                        style={{ width: "100%" }}
                        dataSource={dataTable.cells}
                        columns={dataTable.columns}
                      />
                    )}

                  {!props.selectedNode && <p>No selected node</p>}
                </Panel>
              </Collapse>
            </Col>
          </Row>
        )}
      </div>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    metadata: state.metadata,
    colorLUT: state.colorLUT,
    selectedNode: state.selectedNode,
    graphObject: state.graphObject,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeSelectedNode,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MetadataBox);

/*

*/
