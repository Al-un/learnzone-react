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
import { CATALOG_PATH } from "../components/products/Catalog";
import { ARTICLE_PATH } from "../components/products/Article";

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

        <Route exact path={`${CATALOG_PATH}`} component={CatalogsContainer} />
        <Route
          exact
          path={`${CATALOG_PATH}/new`}
          render={props => secured(props, CatalogContainer, { crud: CRUD.NEW })}
        />
        <Route
          exact
          path={`${CATALOG_PATH}/:id`}
          render={props => <CatalogContainer {...props} crud={CRUD.READ} />}
        />
        <Route
          exact
          path={`${CATALOG_PATH}/:id/edit`}
          render={props =>
            secured(props, CatalogContainer, { crud: CRUD.EDIT })
          }
        />

        <Route exact path={`${ARTICLE_PATH}`} component={ArticlesContainer} />
        <Route
          exact
          path={`${ARTICLE_PATH}/new`}
          render={props => secured(props, ArticleContainer, { crud: CRUD.NEW })}
        />
        <Route
          exact
          path={`${ARTICLE_PATH}/:id`}
          render={props => <ArticleContainer {...props} crud={CRUD.READ} />}
        />
        <Route
          exact
          path={`${ARTICLE_PATH}/:id/edit`}
          render={props =>
            secured(props, ArticleContainer, { crud: CRUD.EDIT })
          }
        />

        <Route exact path="/misc-info" component={MiscInfoPage} />
      </Switch>
    );
  }
}
