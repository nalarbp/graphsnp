import React from "react";
import { Row, Col, Collapse, List, Card } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { changeSelectedNodeSetting } from "../action/graphSettingsActions";

const { Panel } = Collapse;
const MetadataBox = (props) => {
  //GLOBAL VAR
  //STATES
  //SETTINGS
  //HANDLERS
  //input list data
  const data = [
    {
      title: "Title 1",
    },
    {
      title: "Title 2",
    },
    {
      title: "Title 3",
    },
    {
      title: "Title 4",
    },
    {
      title: "Title 5",
    },
    {
      title: "Title 6",
    },
    {
      title: "Title 7",
    },
    {
      title: "Title 8",
    },
    {
      title: "Title 9",
    },
    {
      title: "Title 10",
    },
    {
      title: "Title 8",
    },
    {
      title: "Title 9",
    },
    {
      title: "Title 10",
    },
  ];

  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <Collapse bordered={false} expandIconPosition="right">
            <Panel
              style={{ textAlign: "right" }}
              header={
                <p>
                  <InfoCircleOutlined /> Node info
                </p>
              }
              key="1"
            >
              <List
                grid={{ column: 14 }}
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <Card title={item.title}>Card content</Card>
                  </List.Item>
                )}
              />
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    metadata: state.metadata,
    colorLUT: state.colorLUT,
    selectedNode: state.selectedNode,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeSelectedNodeSetting,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MetadataBox);

/*

*/
