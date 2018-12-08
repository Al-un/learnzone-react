import React from "react";
import IdHiddenInput from "../utils/IdHiddenInput";
import PropTypes from "prop-types";
import { CATALOG_ATTRIBUTES } from "./Catalog";

/**
 * Catalog form
 * @param {*} props
 */
function CatalogForm(props) {
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

CatalogForm.propTypes = {
  entity: PropTypes.shape(CATALOG_ATTRIBUTES).isRequired,
  handleValueChange: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired
};

export default CatalogForm;