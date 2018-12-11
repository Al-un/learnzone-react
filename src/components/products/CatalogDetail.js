import React from "react";
import EditDeleteButtonsRow from "../utils/EditDeleteButtonsRow";
import PropTypes from "prop-types";
import { CATALOG_ATTRIBUTES, CATALOG_PATH } from "./Catalog";
import ArticlePublicationsManager from "./ArticlePublication";
import { ARTICLE_API_PATH } from "./Article";

/**
 * Catalog details
 * @param {*} props
 */
export default class CatalogDetail extends React.Component {
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
              editPath={`${CATALOG_PATH}/${this.props.entity.id}/edit`}
              deleteFunc={() => this.props.deleteById(this.props.entity.id)}
            />
          </div>
        </div>

        <ArticlePublicationsManager
          publications={this.props.entity.article_publications}
          searchUrl={name => `${ARTICLE_API_PATH}/search?name=${name}`}
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
  entity: PropTypes.shape(CATALOG_ATTRIBUTES).isRequired,
  deleteById: PropTypes.func.isRequired
};
