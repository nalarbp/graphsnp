import React, { Component } from "react";
import "./App.css";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "./page_home/page_home";
import GraphSNP from "./page_graphsnp/graphsnp";
import Documentation from "./page_documentation/documentation";
import Header from "./navigation/header";

import history from "./utils/history";

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route path={"/graphsnp"} component={GraphSNP} />
        <Route path={"/documentation"} component={Documentation} />

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
