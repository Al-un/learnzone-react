import React from 'react';
import SideMenu from './SideMenu';
import Toolbar from './Toolbar';
import Main from './Main';

export default class Layout extends React.Component {
  handleBackdropClick() {
    document.getElementById('nav-wrapper').classList.toggle('nav-toggle-menu');
  }

  render() {
    return (
      <div id="nav-wrapper" className="nav-wrapper">
        <SideMenu />
        <div className="nav-container">
          <Toolbar />
          <Main />
        </div>
        <div className="nav-backdrop" onClick={this.handleBackdropClick} />
      </div>
    );
  }
}
