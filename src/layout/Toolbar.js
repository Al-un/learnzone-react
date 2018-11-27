import React from 'react';

export default class Toolbar extends React.Component {
  toggleSideMenu(event) {
      document.getElementById('nav-wrapper').classList.toggle('nav-toggle-menu');
  }

  render() {
    return (
      <header className="nav-toolbar navbar">
        <button type="button" onClick={this.toggleSideMenu}>
          <span className="navbar-toggler-icon fas fa-home" />
        </button>
        Toolbar here
      </header>
    );
  }
}
