import React from "react";
import { NavLink } from "react-router-dom";
import { CATALOG_PATH } from "../components/products/Catalog";
import { ARTICLE_PATH } from "../components/products/Article";

export default class SideMenu extends React.Component {
  render() {
    return (
      <nav className="nav-sidebar">
        <h3 className="text-center">LearnZone React</h3>
        <div className="list-group">
          <NavLink
            to={`${CATALOG_PATH}`}
            activeClassName="active"
            className="list-group-item">
            Catalogs
          </NavLink>
          <NavLink
            to={`${ARTICLE_PATH}`}
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
