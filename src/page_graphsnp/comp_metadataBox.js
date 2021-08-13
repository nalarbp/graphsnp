import React, { useState, useEffect } from "react";
import { Row, Col, Collapse, Table } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
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
  // //DATA FOR TABLE: INITIATION
  // let selectedNodeList =
  //   props.selectedNode && props.selectedNode.length > 0
  //     ? props.selectedNode.map((n) => props.metadata.get(n))
  //     : [];
  // let columns = [];
  // let dataSource = [];
  // selectedNodeList.forEach((d) => {
  //   let keyIndexFoUniq = 0;
  //   for (const [k, v, i] of Object.entries(d)) {
  //     console.log(i);
  //     //column
  //     columns.push({
  //       title: k,
  //       dataIndex: k,
  //       key: k + keyIndexFoUniq.toString(),
  //     });
  //     //datasource
  //     let dataInIndex = dataSource[keyIndexFoUniq]
  //       ? _.cloneDeep(dataSource[keyIndexFoUniq])
  //       : {};
  //     dataInIndex["key"] = keyIndexFoUniq.toString();
  //     dataInIndex[k] = v;
  //     dataSource.push(dataInIndex);
  //     keyIndexFoUniq = keyIndexFoUniq + 1;
  //   }
  // });

  //USEEFFECTS
  useEffect(() => {
    console.log("updated selected node", props.selectedNode);
    if (props.selectedNode) {
      if (props.selectedNode.length > 0) {
        let selectedNodeList = props.selectedNode.map((n) =>
          props.metadata.get(n)
        );
        let columns = [];
        let dataSource = [];
        selectedNodeList.forEach((d) => {
          let keyIndexFoUniq = 0;
          for (const [k, v] of Object.entries(d)) {
            //column
            columns.push({
              title: k,
              dataIndex: k,
              key: k + keyIndexFoUniq.toString(),
            });
            //datasource in index i
            let dataSourceInIndex = dataSource[0];
            let dataInIndex = {};
            if (dataSourceInIndex) {
              // if exist, copy it
              dataInIndex = Object.assign({}, dataSourceInIndex);
            }
            //console.log("before", dataInIndex);
            if (!dataInIndex.key) {
              dataInIndex["key"] = keyIndexFoUniq.toString();
            }
            if (k === "sample_date") {
              dataInIndex[k] = moment(v).format("YYYY-MM-DD");
            } else {
              dataInIndex[k] = v;
            }

            dataSource = [dataInIndex];
            //keyIndexFoUniq = keyIndexFoUniq + 1;
            //console.log("after", dataInIndex);
          }
        });

        setdataTable({
          columns: columns,
          cells: dataSource,
        });
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
        {props.metadata && (
          <Row>
            <Col span={24}>
              <Collapse bordered={false} expandIconPosition="left">
                <Panel
                  style={{
                    marginBottom: "0px",
                    textAlign: "left",
                    overflowY: "auto",
                  }}
                  header={
                    <p style={{ marginBottom: "0px" }}>
                      <InfoCircleOutlined /> Selected node metadata
                    </p>
                  }
                  key="100"
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
