import React, { Component } from "react";
import "./App.css";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route exact path={"/"} component={} />
        <Route path={"/documentation"} component={} />
        <Route path={"/create-map"} component={} />
        <Route path={"/haiviz-spa"} component={} />

        <Redirect to="/" />
      </Switch>
    );
    return (
      <Router history={history}>
        <main>{routes}</main>
      </Router>
    );
  }
}

export default App;
