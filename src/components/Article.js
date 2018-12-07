import React from "react";
import { Link } from "react-router-dom";
import EditDeleteButtonsRow from "./EditDeleteButtonsRow";
import auth from "../services/auth";

export function ArticleForm(props) {
  return (
    <div className="container">
      <form onSubmit={props.handleFormSubmit}>
        {props.entity.id && (
          <input type="hidden" name="id" value={props.entity.id} />
        )}
        <div className="form-group">
          <input
            className="w-100"
            type="text"
            name="name"
            placeholder="Name"
            required={true}
            value={props.entity.name}
            onChange={props.handleValueChange}
          />
        </div>
        <div className="form-group">
          <textarea
            className="w-100"
            name="description"
            placeholder="Description"
            value={props.entity.description || undefined}
            onChange={props.handleValueChange}
          />
        </div>
        <button type="submit" className="btn btn-success btn-lg">
          Save
        </button>
      </form>
    </div>
  );
}

export function ArticleDetail(props) {
  return (
    <div className="card w-100">
      <div className="card-header">
        <h3>
          Article#{props.entity.id} {props.entity.name}
        </h3>
      </div>
      <div className="card-body">
        <span className="card-text">{props.entity.description}</span>
      </div>
      <div className="card-footer">
        {props.auth.isAuthenticated() && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={props.enableEditionMode}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export function ArticleList(props) {
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
                  <p>{article.description}</p>
                </div>
              </Link>
              <div className="card-footer">
                <span>Owner: {article.user_id}</span>
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

// const Article = toggleEditDisplayHoc(ArticleForm, ArticleDetail, {
//   create: article => api_post(`/articles/`, article),
//   update: article => api_patch(`/articles/${article.id}`, article),
//   redirect: id => `/articles/${id}`
// });

// export default Article;