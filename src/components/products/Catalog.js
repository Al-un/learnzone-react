import React from "react";
import { Link } from "react-router-dom";
import EditDeleteButtonsRow from "../utils/EditDeleteButtonsRow";
import auth from "../../services/auth";
import IdHiddenInput from "../utils/IdHiddenInput";

/**
 * Catalog form
 * @param {*} props
 */
export function CatalogForm(props) {
  return (
    <div className="container">
      <form onSubmit={props.handleFormSubmit}>
        <IdHiddenInput id={props.entity.id} />

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
            value={props.entity.description || undefined}
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

/**
 * Catalog details
 * @param {*} props
 */
export function CatalogDetail(props) {
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

/**
 * Catalogs list
 * @param {*} props
 */
export function CatalogList(props) {
  return (
    <div className="container-fluid catalogs-list">
      <h3>Catalogs</h3>
      <div className="row">
        {props.entities.map((catalog, index) => (
          <div key={catalog.id} className="col-12 col-md-3 mt-3">
            <div className="card">
              <Link to={`/catalogs/${catalog.id}`}>
                <div className="card-header">
                  <span>
                    {catalog.code}: {catalog.name}
                  </span>
                </div>

                <div className="card-body">
                  <p>{catalog.description}</p>
                </div>
              </Link>

              <div className="card-footer">
                <span>Owner: {catalog.user_id}</span>
                <EditDeleteButtonsRow
                  editPath={`/catalogs/${catalog.id}/edit`}
                  deleteEntity={() => props.deleteEntity(catalog.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {auth.isAuthenticated() && (
        <div className="row">
          <Link to="/catalogs/new" className="btn btn-outline-primary">
            <span className="fas fa-plus" />
            <span>Create a catalog</span>
          </Link>
        </div>
      )}
    </div>
  );
}
