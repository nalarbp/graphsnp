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
                duration: 30,
                placement: "bottom",
                maxCount: 1,
                description: (
                  <div id="result-notification-container">
                    <p>
                      We advise caution when using fixed SNP thresholds to
                      define clusters, particularly during "long-term" outbreaks
                      or when there is significant community carriage. SNP
                      thresholds are generally post hoc, arbitrary and can be
                      confounded by intra-host diversity and other factors that
                      can influence mutation rates (e.g. exposure to
                      antibiotics). Please note that the SNP threshold can be
                      modified by adjusting the "Cutoff number" input.
                    </p>
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
                duration: 30,
                placement: "bottom",
                maxCount: 1,
                description: (
                  <div id="result-notification-container">
                    <p>
                      Please note that the{" "}
                      <a
                        href="https://pubmed.ncbi.nlm.nih.gov/20551981/"
                        target="_blank"
                        rel="noreferrer">
                        SeqTrack
                      </a>{" "}
                      algorithm attempts to infer ancestry based on isolate
                      collection dates and genetic distance, regardless of SNP
                      thresholds. Consequently, all possible transmission links
                      converge on the earliest collected sample, which can
                      obscure disparate transmission clusters and falsely infer
                      transmission dynamics. To mask unlikely transmissions
                      filtering has been applied using a predefined range
                      (default: 0-15 SNPs). Masking thresholds can be adjusted
                      using the 'Show Partial Edge' function.
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
