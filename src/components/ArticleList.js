import React from "react";
import { Link } from "react-router-dom";
import EditDeleteButtonsRow from "./EditDeleteButtonsRow";

export default class ArticleList extends React.Component {
  render() {
    return (
      <div className="container-fluid articles-list">
        <h3>Articles</h3>
        <div className="row">
          {this.props.entities.map((article, index) => (
            <div key={article.id} className="col-12 col-md-3 mt-3">
              <div className="card">
                <Link to={`/articles/${article.id}`}>
                  <div className="card-header">
                    <span>{article.name}</span>
                  </div>
                  <div className="card-body">
                    <p>{article.description}</p>
                  </div>
                </Link>
                <div className="card-footer">
                  <EditDeleteButtonsRow
                    editPath={`/articles/${article.id}/edit`}
                    deleteEntity={() => this.props.deleteEntity(article.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <Link to="/articles/new" className="btn btn-outline-primary">
            <span className="fas fa-plus" />
            <span>Create an article</span>
          </Link>
        </div>
      </div>
    );
  }
}
