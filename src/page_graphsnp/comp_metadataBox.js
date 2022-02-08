import React, { useState, useEffect } from "react";
import { Row, Col, Collapse, Table } from "antd";
import { TableOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Moment from "moment";
import { extendMoment } from "moment-range";
import { changeSelectedNode } from "../action/graphSettingsActions";

const { Panel } = Collapse;
const moment = extendMoment(Moment);
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
            console.log(c.dataIndex);
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
      <div
        style={{
          position: "absolute",
          zIndex: "10",
          top: "inherit",
          width: "100%",
        }}
      >
        {props.metadata && props.graphObject && (
          <Row>
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
                  key="1"
                >
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
