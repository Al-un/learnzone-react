import React from "react";
import toggleEditDisplayHoc from "./utils/ToggleEditDisplayHoc";
import { api_post, api_patch } from "../api";

function ArticleForm(props) {
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

function ArticleDetail(props) {
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

const Article = toggleEditDisplayHoc(ArticleForm, ArticleDetail, {
  create: article => api_post(`/articles/`, article),
  update: article => api_patch(`/articles/${article.id}`, article),
  redirect: id => `/articles/${id}`
});

export default Article;
