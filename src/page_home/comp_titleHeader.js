import { Row, Col } from "antd";
import React from "react";
import "./style_home.css";
const TitleHeaderComponent = (props) => {
  return (
    <React.Fragment>
      <Col sm={16} id="title-header-component">
        <p>
          GraphSNP: Graph-based outbreak cluster and transmission detection and
          visualization using single-nucleotide polymorphism (SNP) in web
          browser
        </p>
      </Col>
    </React.Fragment>
  );
};

export default TitleHeaderComponent;
