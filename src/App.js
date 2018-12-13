//React
import React, { Component } from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
// Styles
import "./stylesheets/application.scss";
// Services
import auth from "./services/auth";
import history from "./routes/history";
import store from "./redux/configureStore";
// Components
import Layout from "./layout/Layout";

class App extends Component {
  render() {
    const basename =
      process.env.NODE_ENV === "development" ? "/" : "/learnzone";

    return (
      <Provider store={store}>
        <Router history={history} basename={basename}>
          <Layout auth={auth} />
        </Router>
      </Provider>
    );
  }
}

export default App;
