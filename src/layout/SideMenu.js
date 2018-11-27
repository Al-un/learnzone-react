import React from "react";
import { NavLink } from "react-router-dom";

export default class SideMenu extends React.Component {
  render() {
    return (
      <nav className="nav-sidebar">
        <h3 className="text-center">LearnZone React</h3>
        <div className="list-group">
          <NavLink
            to="/catalogs"
            activeClassName="active"
            className="list-group-item">
            Catalogs
          </NavLink>
          <NavLink
            to="/articles"
            activeClassName="active"
            className="list-group-item">
            Articles
          </NavLink>
          <NavLink
            to="/misc-info"
            activeClassName="active"
            className="list-group-item">
            Misc-info
          </NavLink>
        </div>
      </nav>
    );
  }
}
