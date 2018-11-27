import React from "react";
import { Switch, Route } from "react-router-dom";
import CatalogsContainer from "../containers/CatalogsContainer";
import CatalogContainer from "../containers/CatalogContainer";
import ArticlesContainer from "../containers/ArticlesContainer";
import ArticleContainer from "../containers/ArticleContainer";
import MiscInfoPage from "../pages/MiscInfoPage";

/**
 * https://reacttraining.com/react-router/core/api/
 */
export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={CatalogsContainer} />

        <Route exact path="/catalogs" component={CatalogsContainer} />
        <Route
          exact
          path="/catalogs/new"
          render={props => <CatalogContainer {...props} crud="new" />}
        />
        <Route
          exact
          path="/catalogs/:id"
          render={props => <CatalogContainer {...props} crud="display" />}
        />
        <Route
          exact
          path="/catalogs/:id/edit"
          render={props => <CatalogContainer {...props} crud="edit" />}
        />

        <Route exact path="/articles" component={ArticlesContainer} />
        <Route
          exact
          path="/articles/new"
          render={props => <ArticleContainer {...props} crud="new" />}
        />
        <Route
          exact
          path="/articles/:id"
          render={props => <ArticleContainer {...props} crud="display" />}
        />
        <Route
          exact
          path="/articles/:id/edit"
          render={props => <ArticleContainer {...props} crud="edit" />}
        />

        <Route exact path="/misc-info" component={MiscInfoPage} />
      </Switch>
    );
  }
}
