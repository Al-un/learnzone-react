import React, { Component } from "react";
import "./stylesheets/application.scss";
import Layout from "./layout/Layout";
import { Router } from "react-router-dom";
import auth from "./services/auth";
import history from "./routes/history";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Layout auth={auth} />
      </Router>
    );
  }
}

export default App;
