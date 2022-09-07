import { QuestionCircleOutlined } from "@ant-design/icons";
import { Col, Collapse, Row, Tooltip } from "antd";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./style_snpdist.css";
import { ChartHeader } from "./util_snpDist";

import SNPDistBarAll from "./comp_all_snpDist_bar";
import SNPDistViolinAll from "./comp_all_snpDist_violin";
import SNPDistPieGroup from "./comp_group_snpDist_piechart";
import SNPDistViolinGroup from "./comp_group_snpDist_violin";
import SNPDistBoxplotIntraInterGroup from "./comp_intraInter_group_snpDist_violin";
import SNPdistSettings from "./comp_snpDist_settings";
const { Panel } = Collapse;

const SNPdistance = (props) => {
  return (
    <React.Fragment>
      <Row className="gp-collapsible-container">
        <Collapse
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderBottom: "1px solid lightgray",
            width: "100vw",
          }}
          accordion={true}
          bordered={false}
          expandIconPosition="left"
          defaultActiveKey={[]}
          ghost={true}>
          <Panel
            header={
              <p>
                Charts Settings{" "}
                <span>
                  <Tooltip
                    title="Click to show and hide settings panel to create the charts"
                    placement="rightTop">
                    <QuestionCircleOutlined style={{ color: "red" }} />
                  </Tooltip>
                </span>
              </p>
            }
            key="1">
            <SNPdistSettings />
          </Panel>
        </Collapse>
      </Row>

      <Row id="snpdist-charts-container">
        <Col xs={24} sm={16} md={16}>
          <div className="snpDist-chart-box">
            <ChartHeader title={"All samples"} chartID={"gp-all-bar"} />
            <SNPDistBarAll />
          </div>
        </Col>

        <Col xs={24} sm={8} md={8}>
          <div className="snpDist-chart-box">
            <ChartHeader title={"All samples"} chartID={"gp-all-boxplot"} />
            <SNPDistViolinAll />
          </div>
        </Col>

        {props.snpDistSettings.dataColumn && (
          <Col xs={24} sm={9} md={8}>
            <div className="snpDist-chart-box">
              <ChartHeader title={"Group"} chartID={"gp-group-boxplot"} />
              <SNPDistViolinGroup />
            </div>
          </Col>
        )}

        {props.snpDistSettings.dataColumn && (
          <Col xs={24} sm={9} md={8}>
            <div className="snpDist-chart-box">
              <ChartHeader
                title={"Intra & inter-group"}
                chartID={"gp-group-intra-inter-boxplot"}
              />
              <SNPDistBoxplotIntraInterGroup />
            </div>
          </Col>
        )}

        {props.snpDistSettings.dataColumn && (
          <Col xs={24} sm={6} md={8}>
            <div className="snpDist-chart-box">
              <ChartHeader title={"Group"} chartID={"gp-group-piechart"} />
              <SNPDistPieGroup />
            </div>
          </Col>
        )}
      </Row>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    hammingMatrix: state.hammMatrix,
    snpDistSettings: state.snpDistSettings,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SNPdistance);

/*
 */
