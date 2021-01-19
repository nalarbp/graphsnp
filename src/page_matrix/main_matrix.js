import React from "react";
import { Row, Col, Modal, Spin } from "antd";
import "./style_matrix.css";
import { connect } from "react-redux";

import MatrixViewer from "./comp_matrixViewer";

const GraphMatrix = (props) => {
  return (
    <React.Fragment>
      <Row>
        <Col xs={24}>
          {props.graphMatrix.data &&
            props.graphMatrix.data.cells &&
            props.graphMatrix.data.headers && (
              <MatrixViewer graphMatrix={props.graphMatrix} />
            )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    graphMatrix: state.graphMatrix,
  };
}

export default connect(mapStateToProps)(GraphMatrix);
