import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Create button can:
 * - redirect to `new` URL
 * - TODO...
 */
const CreateButton = props => {
  // URL redirection
  if (props.url) {
    return (
      <Link to={props.url} className="btn btn-outline-primary">
        <span className="fas fa-plus" />
        <span>{props.value}</span>
      </Link>
    );
  }
  // TODO: other create buttons
  else {
    return <div />;
  }
};

CreateButton.propTypes = {
  url: PropTypes.string,
  value: PropTypes.string
};

CreateButton.defaultProps = {
  value: "Create"
};

/**
 * Delete button can only delete via an Ajax request
 */
const DeleteButton = props => (
  <button className="btn btn-danger btn-sm" onClick={props.deleteFunc}>
    <span className="fas fa-trash" />
    <span>Delete</span>
  </button>
);

DeleteButton.propTypes = {
  deleteFunc: PropTypes.func.isRequired
};

export { CreateButton, DeleteButton };
