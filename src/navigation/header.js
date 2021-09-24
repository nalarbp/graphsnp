import React from "react";
import { Row, Col } from "antd";
import NavigationMenu from "./navigation";
import logo from "../img/logo.png";
import "./style_navigation.css";

const Header = (props) => {
  //console.log("Header");
  return (
    <React.Fragment>
      <Row id="main-header">
        <Col id="header-navigation" xs={8} sm={18}>
          <NavigationMenu />
        </Col>
        <Col id="header-logo" xs={16} sm={6}>
          <img
            style={{ float: "right" }}
            src={logo}
            alt="GraphSNP"
            height="75px"
          ></img>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Header;
