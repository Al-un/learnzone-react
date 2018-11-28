import React, { Component } from "react";
import history from "../../routes/history";

export default class Callback extends Component {
  componentDidMount() {
    this.props.auth.handleAuthentication();
    if (/access_token|id_token|error/.test(this.props.history.location.hash)) {
      console.log("Handling authentication");
      this.props.auth.handleAuthentication();
    } else {
      console.log("No authentication to handle in AuthCallback. Redirect to /");
      history.replace("/");
    }
  }

  render() {
    return <div>Authentication in progress...</div>;
  }
}
