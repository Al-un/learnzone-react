import React from "react";
import toggleEditDisplayHoc from "./utils/ToggleEditDisplayHoc";
import { api_post, api_patch } from "../api";

function CatalogForm(props) {
  return (
    <div className="container">
      <form onSubmit={props.handleFormSubmit}>
        <input type="hidden" name="id" value={props.entity.id} />
        <div className="form-group">
          <input
            className="col col-md-2"
            type="text"
            name="code"
            required={true}
            placeholder="Code"
            value={props.entity.code}
            onChange={props.handleValueChange}
          />
          <input
            className="col col-md-10"
            type="text"
            name="name"
            required={true}
            placeholder="Name"
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
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

function CatalogDetail(props) {
  return (
    <div className="card w-100">
      <div className="card-header">
        <h3>
          Catalog#{props.entity.id} [{props.entity.code}] {props.entity.name}
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

const Catalog = toggleEditDisplayHoc(CatalogForm, CatalogDetail, {
  create: catalog => api_post(`/catalogs/`, catalog),
  update: catalog => api_patch(`/catalogs/${catalog.id}`, catalog)
});

export default Catalog;
