import React from "react";
import EditDeleteButtonsRow from "../utils/EditDeleteButtonsRow";
import PropTypes from "prop-types";
import { api_delete } from "../../api";
import history from "../../routes/history";
import { CATALOG_ATTRIBUTES } from "./Catalog";
import ArticlePublicationsManager from "./ArticlePublication";

/**
 * Catalog details
 * @param {*} props
 */
export default class CatalogDetail extends React.Component {
  /**
   * Deleting the shown catalog
   */
  handleCatalogDeletion = id => {
    console.log(`deleting catalog#${id}`);
    api_delete(`/catalogs/${id}`).then(resp => {
      // console.log("Deletion response:");
      // console.log(resp);
      history.replace("/catalogs/");
    });
  };

  render() {
    return (
      <div>
        <div className="card w-100">
          <div className="card-header">
            <h3>
              Catalog#{this.props.entity.id} [{this.props.entity.code}]{" "}
              {this.props.entity.name}
            </h3>
          </div>

          <div className="card-body">
            <span className="card-text">{this.props.entity.description}</span>
          </div>

          <div className="card-footer">
            <EditDeleteButtonsRow
              editPath={`/catalogs/${this.props.entity.id}/edit`}
              deleteEntity={() =>
                this.handleCatalogDeletion(this.props.entity.id)
              }
            />
          </div>
        </div>

        <ArticlePublicationsManager
          publications={this.props.entity.article_publications}
          searchUrl={name => `/articles/search?name=${name}`}
          entityName="Article"
          buildPublication={articleId => {
            return { catalog_id: this.props.entity.id, article_id: articleId };
          }}
        />
      </div>
    );
  }
}

CatalogDetail.propTypes = {
  entity: PropTypes.shape(CATALOG_ATTRIBUTES).isRequired
};
