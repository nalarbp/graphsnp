import { Checkbox, Col, notification, Row } from "antd";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  changeIsShowClustNotif,
  changeIsShowTransNotif,
} from "../action/graphSettingsActions";

const ResultNotificationContent = (props) => {
  const isShowClustNotifHandler = (e) => {
    let isChecked = e.target.checked;
    props.changeIsShowClustNotif(isChecked);
    setTimeout(() => notification.destroy(), 900);
  };

  const isShowTransNotifHandler = (e) => {
    let isChecked = e.target.checked;
    props.changeIsShowTransNotif(isChecked);
    setTimeout(() => notification.destroy(), 900);
  };

  return (
    <React.Fragment>
      <Row>
        {props.graphObject != null &&
          props.typeOfAnalysis === "clustering" &&
          !props.isShowClustNotif && (
            <Col xs={24}>
              {notification.destroy()}
              {notification.info({
                message: "Cluster Graph",
                className: "graphOutNotification",
                duration: 20,
                placement: "bottom",
                maxCount: 1,
                description: (
                  <div id="result-notification-container">
                    <p>
                      SNP-based clustering is a rapid way of exploring isolated
                      relatedness. Samples are considered to belong to the same
                      cluster if the number of SNPs between them is less than or
                      equal to a fixed threshold (default: 25 SNPs). However,
                      the cluster structure (size and membership) is highly
                      dependent on the applied threshold, which can vary greatly
                      even within the same species. To use different cutoff,
                      adjust the 'Cutoff number' input. For the most accurate
                      results, it is important for users to select an
                      appropriate cutoff number.
                    </p>
                    ,
                    <Checkbox
                      style={{ fontSize: "14px", color: "rgb(0, 113, 219)" }}
                      onChange={isShowClustNotifHandler}>
                      Understood. Do not show this message again.{" "}
                    </Checkbox>
                  </div>
                ),
              })}
            </Col>
          )}

        {props.graphObject != null &&
          props.typeOfAnalysis === "transmission" &&
          !props.isShowTransNotif && (
            <Col xs={24}>
              {notification.destroy()}
              {notification.info({
                message: "Transmission Tree",
                className: "graphOutNotification",
                duration: 20,
                placement: "bottom",
                maxCount: 1,
                description: (
                  <div id="result-notification-container">
                    <p>
                      The displayed tree is the most parsimonious tree generated
                      by{" "}
                      <a
                        href="https://pubmed.ncbi.nlm.nih.gov/20551981/"
                        target="_blank"
                        rel="noreferrer">
                        SeqTrack.
                      </a>{" "}
                      The tree infers transmission relationships between all
                      samples. GraphSNP applies a second filtering step to
                      remove unlikely 'transmission links' based on a defined
                      range (default: 0-11 SNPs). To view potential transmission
                      links beyond this range, adjust the 'Show Partial Edge'
                      input. For the most accurate results, it is important for
                      users to select an appropriate cutoff or range number.
                    </p>
                    <Checkbox
                      style={{ fontSize: "14px", color: "rgb(0, 113, 219)" }}
                      onChange={isShowTransNotifHandler}>
                      Understood. Do not show this message again.{" "}
                    </Checkbox>
                  </div>
                ),
              })}
            </Col>
          )}
      </Row>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    graphObject: state.graphObject,
    typeOfAnalysis: state.graphSettings.typeOfAnalysis,
    isShowClustNotif: state.graphSettings.isShowClusterNotification,
    isShowTransNotif: state.graphSettings.isShowTransNotification,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeIsShowClustNotif,
      changeIsShowTransNotif,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultNotificationContent);

/*

*/
