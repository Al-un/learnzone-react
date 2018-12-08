import React from "react";
import EditDeleteButtonsRow from "../utils/EditDeleteButtonsRow";
import PropTypes from "prop-types";
import { api_delete } from "../../api";
import history from "../../routes/history";
import { ARTICLE_ATTRIBUTES } from "./Article";
import ArticlePublicationsManager from "./ArticlePublication";

/**
 * Article details
 * @param {*} props
 */
export default class ArticleDetail extends React.Component {
  /**
   * Deleting the shown article
   */
  handleArticleDeletion = id => {
    console.log(`deleting article#${id}`);
    api_delete(`/articles/${id}`).then(resp => {
      // console.log("Deletion response:");
      // console.log(resp);
      history.replace("/articles/");
    });
  };

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
              editPath={`/articles/${this.props.entity.id}/edit`}
              deleteEntity={() =>
                this.handleArticleDeletion(this.props.entity.id)
              }
            />
          </div>
        </div>

        <ArticlePublicationsManager
          publications={this.props.entity.article_publications}
          searchUrl={name => `/catalogs/search?name=${name}`}
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
  entity: PropTypes.shape(ARTICLE_ATTRIBUTES).isRequired
};
