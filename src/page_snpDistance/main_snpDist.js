import { QuestionCircleOutlined } from "@ant-design/icons";
import { Col, Collapse, Row, Tooltip } from "antd";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SNPDistBarAll from "./comp_all_snpDist_bar";
import SNPDistViolinAll from "./comp_all_snpDist_violin";
import SNPDistPieGroup from "./comp_group_snpDist_piechart";
import SNPDistViolinGroup from "./comp_group_snpDist_violin";
import HighResModalChart from "./comp_highResModalChart";
import SNPDistBoxplotIntraInterGroup from "./comp_intraInter_group_snpDist_violin";
import SNPdistSettings from "./comp_snpDist_settings";
import "./style_snpdist.css";
import { ChartHeader } from "./util_snpDist";
const { Panel } = Collapse;

const SNPdistance = (props) => {
  return (
    <React.Fragment>
      <Row className="gp-collapsible-container">
        <HighResModalChart />
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
                Charts Settings: click to create charts{" "}
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
            <ChartHeader
              title={"Distance distribution (all)"}
              chartID={"gp-all-bar"}
              desc={
                "A bar chart displaying the count (y-axis) of each SNP distance or other distance type (x-axis) in all sample's pairwise distances."
              }
            />

            <SNPDistBarAll />
          </div>
        </Col>

        <Col xs={24} sm={8} md={8}>
          <div className="snpDist-chart-box">
            <ChartHeader
              title={"Distance statistics (all)"}
              chartID={"gp-all-boxplot"}
              desc={
                "The violin chart shows the distribution of SNP distances or other distance types (y-axis) of all samples. Hover on chart to display the statistics."
              }
            />
            <SNPDistViolinAll />
          </div>
        </Col>

        <Col xs={24} sm={9} md={8}>
          <div className="snpDist-chart-box">
            <ChartHeader
              title={"Distances by group"}
              chartID={"gp-group-boxplot"}
              desc={
                "The violin chart shows the distribution of SNP distances or other distance types (y-axis) grouped by categorical variables (x-axis) as specified in a metadata column. Hover on chart to display the statistics."
              }
            />
            <SNPDistViolinGroup />
          </div>
        </Col>

        <Col xs={24} sm={9} md={8}>
          <div className="snpDist-chart-box">
            <ChartHeader
              title={"Intra & inter-group"}
              chartID={"gp-group-intra-inter-boxplot"}
              desc={
                "The violin chart displays the distribution of SNP distances or other distance types (represented on the y-axis) based on the categorical grouping specified in a metadata column (represented on the x-axis). The chart distinguishes between intra-group distances (within the same group) and inter-group distances (between different groups). Hover on chart to display the statistics."
              }
            />
            <SNPDistBoxplotIntraInterGroup />
          </div>
        </Col>

        <Col xs={24} sm={6} md={8}>
          <div className="snpDist-chart-box">
            <ChartHeader
              title={"Grouping variable"}
              chartID={"gp-group-piechart"}
              desc={
                "The doughnut chart displays the variables used for grouping as specified in a metadata column."
              }
            />
            <SNPDistPieGroup />
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    hammingMatrix: state.hammMatrix,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SNPdistance);

/*

 */
