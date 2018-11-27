import React from 'react';

export default class SideMenu extends React.Component {
  render() {
    return (
      <nav className="nav-sidebar">
        <h3 class="text-center">LearnZone React</h3>
        <div className="list-group">
          <a className="list-group-item" href="/">
            Catalogs
          </a>
          <a className="list-group-item" href="/">
            Articles
          </a>
          <a className="list-group-item" href="/">
            Misc info
          </a>
        </div>
      </nav>
    );
  }
}
