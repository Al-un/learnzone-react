import React from "react";
import EditDeleteButtonsRow from "../utils/EditDeleteButtonsRow";
import PropTypes from "prop-types";
import { ARTICLE_ATTRIBUTES, ARTICLE_PATH } from "./Article";
import ArticlePublicationsManager from "./ArticlePublication";
import { CATALOG_API_PATH } from "./Catalog";

/**
 * Article details
 * @param {*} props
 */
export default class ArticleDetail extends React.Component {
  render() {
    return (
      <div>
        <div className="card w-100">
          <div className="card-header">
            <h3>
              Article#{this.props.entity.id} {this.props.entity.name}
            </h3>
          </div>

          <div className="card-body">
            <span className="card-text">{this.props.entity.description}</span>
          </div>

          <div className="card-footer">
            <EditDeleteButtonsRow
              editPath={`${ARTICLE_PATH}/${this.props.entity.id}/edit`}
              deleteFunc={() => this.props.deleteById(this.props.entity.id)}
            />
          </div>
        </div>

        <ArticlePublicationsManager
          publications={this.props.entity.article_publications}
          searchUrl={name => `${CATALOG_API_PATH}/search?name=${name}`}
          entityName="Catalog"
          buildPublication={catalogId => {
            return { catalog_id: catalogId, article_id: this.props.entity.id };
          }}
        />
      </div>
    );
  }
}

ArticleDetail.propTypes = {
  entity: PropTypes.shape(ARTICLE_ATTRIBUTES).isRequired,
  deleteById: PropTypes.func.isRequired
};
