import React, { Component } from "react";
import "./stylesheets/application.scss";
import Layout from "./layout/Layout";
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
  }
}

export default App;
