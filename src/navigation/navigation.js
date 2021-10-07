import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import history from "../utils/history";
import { changeNavLocation } from "../action/navigationActions";

const NavigationMenu = (props) => {
  const currentKeys = props.navLocation
    ? props.navLocation
    : getKeyFromLocationPath(history.location.pathname);

  function getKeyFromLocationPath(location) {
    if (location) {
      switch (location) {
        case "/":
          return "home";
        case "/graphsnp":
          return "graphsnp";
        case "/documentation":
          return "documentation";
        case "/snpdistance":
          return "matrix";
        default:
          return "none";
      }
    } else {
      return "none";
    }
  }

  return (
    <React.Fragment>
      <Menu
        id="header-menu"
        mode="horizontal"
        selectedKeys={[currentKeys]}
        overflowedIndicator={<MenuOutlined />}
      >
        <Menu.Item
          key="home"
          style={{ padding: "0 20px", margin: "0px" }}
          onClick={(e) => {
            props.changeNavLocation(e.key);
          }}
        >
          <NavLink to="/" exact>
            Input
          </NavLink>
        </Menu.Item>

        <Menu.Item
          key="snpdistance"
          style={{ padding: "0 20px", margin: "0px" }}
          onClick={(e) => {
            props.changeNavLocation(e.key);
          }}
        >
          <NavLink to="/snpdistance">Distances</NavLink>
        </Menu.Item>

        <Menu.Item
          key="graphsnp"
          style={{ padding: "0 20px", margin: "0px" }}
          onClick={(e) => {
            props.changeNavLocation(e.key);
          }}
        >
          <NavLink to="/graphsnp">Graph</NavLink>
        </Menu.Item>
        <Menu.Item
          key="documentation"
          style={{ padding: "0 20px", margin: "0px" }}
          onClick={(e) => {
            props.changeNavLocation(e.key);
          }}
        >
          <NavLink to="/documentation">Documentation</NavLink>
        </Menu.Item>
      </Menu>
    </React.Fragment>
  );
};

function mapStateToProps(state, ownProps) {
  return { navLocation: state.navSettings.navLocation };
}

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators(
    {
      changeNavLocation: changeNavLocation,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationMenu);

// selectedKeys={getSelectedKeys(history.location)}
