import React, { Component } from "react";
import history from "../../routes/history";
import Log from "../log";

export default class Callback extends Component {
  componentDidMount() {
    this.props.auth.handleAuthentication();
    if (/access_token|id_token|error/.test(this.props.history.location.hash)) {
      Log.info("Handling authentication", { tags: "Auth" });
      this.props.auth.handleAuthentication();
    } else {
      Log.warn("Nothing to handle. Redirect to /", { tags: "Auth" });
      history.replace("/");
    }
  }

  render() {
    return <div>Authentication in progress...</div>;
  }
}
