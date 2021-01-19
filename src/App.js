import React, { Component } from "react";
import "./App.css";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "./page_home/main_home";
import GraphSNP from "./page_graphsnp/main_graphsnp";
import Documentation from "./page_documentation/main_documentation";
import GraphMatrix from "./page_matrix/main_matrix";
import Header from "./navigation/header";

import history from "./utils/history";

class App extends Component {
  render() {
    //console.log("App");
    let routes = (
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route path={"/graphsnp"} component={GraphSNP} />
        <Route path={"/documentation"} component={Documentation} />
        <Route path={"/matrix"} component={GraphMatrix} />

        <Redirect to="/" />
      </Switch>
    );
    return (
      <Router history={history}>
        <Header />
        <main>{routes}</main>
      </Router>
    );
  }
}

export default App;
//Called once when first loaded
//Changing page didn't reload App
