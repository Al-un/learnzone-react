import React from "react";
import Routes from "../routes";

export default class Main extends React.Component {
  render() {
    return (
      <main className="nav-content">
        <Routes auth={this.props.auth} />
      </main>
    );
  }
}
