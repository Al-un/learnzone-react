import React from "react";
import { Switch, Route } from "react-router-dom";
import CatalogsContainer from "../containers/products/CatalogsContainer";
import CatalogContainer from "../containers/products/CatalogContainer";
import ArticlesContainer from "../containers/products/ArticlesContainer";
import ArticleContainer from "../containers/products/ArticleContainer";
import MiscInfoPage from "../pages/static/MiscInfoPage";
import CRUD from "../api/crud";
import { Callback } from "../services/auth";
import secured from "../services/auth/Secured";

/**
 * Exporting root path
 */
export const ROOT_PATH = "/";

/**
 * https://reacttraining.com/react-router/core/api/
 */
export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={CatalogsContainer} />

        <Route
          exact
          path="/callback"
          render={props => <Callback {...props} auth={this.props.auth} />}
        />

        <Route exact path="/catalogs" component={CatalogsContainer} />
        <Route
          exact
          path="/catalogs/new"
          render={props => secured(props, CatalogContainer, { crud: CRUD.NEW })}
        />
        <Route
          exact
          path="/catalogs/:id"
          render={props => <CatalogContainer {...props} crud={CRUD.READ} />}
        />
        <Route
          exact
          path="/catalogs/:id/edit"
          render={props =>
            secured(props, CatalogContainer, { crud: CRUD.EDIT })
          }
        />

        <Route exact path="/articles" component={ArticlesContainer} />
        <Route
          exact
          path="/articles/new"
          render={props => secured(props, ArticleContainer, { crud: CRUD.NEW })}
        />
        <Route
          exact
          path="/articles/:id"
          render={props => <ArticleContainer {...props} crud={CRUD.READ} />}
        />
        <Route
          exact
          path="/articles/:id/edit"
          render={props =>
            secured(props, ArticleContainer, { crud: CRUD.EDIT })
          }
        />

        <Route exact path="/misc-info" component={MiscInfoPage} />
      </Switch>
    );
  }
}
