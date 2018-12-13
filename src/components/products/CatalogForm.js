import React from "react";
import { IdHiddenInput } from "../utils/Inputs";
import PropTypes from "prop-types";
import { CATALOG_ATTRIBUTES } from "./Catalog";

/**
 * Catalog form
 * @param {*} props
 */
class CatalogForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entity: this.props.entity
    };
  }

  /**
   * Update the local state whenever a input is modified
   */
  handleValueChange = event => {
    // Log.debug(`New value of ${event.target.name} is ${event.target.value}`);
    this.setState({
      entity: {
        ...this.state.entity,
        [event.target.name]: event.target.value
      }
    });
    // Log.debug(`updating entity ${JSON.stringify(this.state)}`);
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.props.saveEntity(this.state.entity);
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleFormSubmit}>
          <IdHiddenInput id={this.state.entity.id} />

          <div className="form-group">
            <input
              className="col col-md-2"
              type="text"
              name="code"
              required={true}
              placeholder="Code"
              value={this.state.entity.code}
              onChange={this.handleValueChange}
            />
            <input
              className="col col-md-10"
              type="text"
              name="name"
              required={true}
              placeholder="Name"
              value={this.state.entity.name}
              onChange={this.handleValueChange}
            />
          </div>

          <div className="form-group">
            <textarea
              className="w-100"
              name="description"
              placeholder="Description"
              value={this.state.entity.description || undefined}
              onChange={this.handleValueChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    );
  }
}

CatalogForm.propTypes = {
  entity: PropTypes.shape(CATALOG_ATTRIBUTES).isRequired,
  saveEntity: PropTypes.func.isRequired
};

export default CatalogForm;
