import React from "react";
import { Link } from "react-router-dom";
import EditDeleteButtonsRow from "../utils/EditDeleteButtonsRow";
import auth from "../../services/auth";
import PropTypes from "prop-types";

/**
 * Articles list
 * @param {*} props
 */
function ArticleList(props) {
  return (
    <div className="container-fluid articles-list">
      <h3>Articles</h3>
      <div className="row">
        {props.entities.map((article, index) => (
          <div key={article.id} className="col-12 col-md-3 mt-3">
            <div className="card">
              <Link to={`/articles/${article.id}`}>
                <div className="card-header">
                  <span>{article.name}</span>
                </div>

                <div className="card-body">
                  <p className="card-text">{article.description}</p>
                  <p className="card-text">
                    {article.publications_count} catalog(s)
                  </p>
                </div>
              </Link>

              <div className="card-footer">
                <span>Owner: {article.user.auth0_id}</span>
                <EditDeleteButtonsRow
                  editPath={`/articles/${article.id}/edit`}
                  deleteEntity={() => props.deleteEntity(article.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {auth.isAuthenticated && (
        <div className="row">
          <Link to="/articles/new" className="btn btn-outline-primary">
            <span className="fas fa-plus" />
            <span>Create an article</span>
          </Link>
        </div>
      )}
    </div>
  );
}

ArticleList.propTypes = {
  entities: PropTypes.array.isRequired,
  deleteEntity: PropTypes.func.isRequired
};

export default ArticleList;
