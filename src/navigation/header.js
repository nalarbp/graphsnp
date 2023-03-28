import { Col, Row } from "antd";
import React from "react";
import logo from "../img/logo.png";
import NavigationMenu from "./navigation";
import "./style_navigation.css";

const Header = (props) => {
  return (
    <React.Fragment>
      <Row className="main-header">
        <Col id="header-navigation" xs={18}>
          <NavigationMenu />
        </Col>
        <Col id="header-logo" xs={6}>
          <img
            style={{ float: "right" }}
            src={logo}
            alt="GraphSNP"
            height="70px"></img>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Header;
