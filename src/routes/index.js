import React from "react";
import { Switch, Route } from "react-router-dom";
import CatalogsContainer from "../containers/CatalogsContainer";
import CatalogContainer from "../containers/CatalogContainer";
import ArticlesContainer from "../containers/ArticlesContainer";
import ArticleContainer from "../containers/ArticleContainer";
import MiscInfoPage from "../pages/MiscInfoPage";

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={CatalogsContainer} />

        <Route exact path="/catalogs" component={CatalogsContainer} />
        <Route path="/catalogs/:id" component={CatalogContainer} />

        <Route exact path="/articles" component={ArticlesContainer} />
        <Route path="/articles/:id" component={ArticleContainer} />

        <Route exact path="/misc-info" component={MiscInfoPage} />
      </Switch>
    );
  }
}
