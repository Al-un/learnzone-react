import React from "react";

export default class Toolbar extends React.Component {
  toggleSideMenu(_event) {
    document.getElementById("nav-wrapper").classList.toggle("nav-toggle-menu");
  }

  render() {
    return (
      <header className="nav-toolbar navbar">
        <button
          className="nav-toggler btn"
          type="button"
          onClick={this.toggleSideMenu}>
          <span className="fas fa-bars" />
        </button>

        {this.props.auth.isAuthenticated() ? (
          <button
            className="btn"
            type="button"
            onClick={this.props.auth.logout}>
            <span className="fas fa-sign-out-alt" />
            Logout
          </button>
        ) : (
          <button className="btn" type="button" onClick={this.props.auth.login}>
            <span className="fas fa-user" />
            Login
          </button>
        )}
      </header>
    );
  }
}
