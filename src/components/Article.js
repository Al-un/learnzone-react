import React from "react";
import toggleEditDisplayHoc from "./utils/ToggleEditDisplayHoc";

function ArticleForm(props) {
  return (
    <div className="container">
      <form onSubmit={props.handleFormSubmit}>
        <input type="hidden" name="id" value={props.entity.id} />
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
            value={props.entity.description}
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
        <button
          type="button"
          className="btn btn-secondary"
          onClick={props.enableEditionMode}>
          Edit
        </button>
      </div>
    </div>
  );
}

const entitySaveFunction = entity => {
  console.log(`Saving article ${JSON.stringify(entity)}`);
};

const Article = toggleEditDisplayHoc(
  ArticleForm,
  ArticleDetail,
  entitySaveFunction
);

export default Article;
