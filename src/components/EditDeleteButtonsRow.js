import React from "react";
import { Link } from "react-router-dom";

export default class EditDeleteButtonsRow extends React.Component {
  /**
   * Ensure confirmation before deletion
   */
  handleDeletion = () => {
    let confirmMsg = this.props.deleteMsg || "Confirm deletion?";
    let confirmDel = window.confirm(confirmMsg);
    if (confirmDel) {
      this.props.deleteEntity();
    }
  };

  render() {
    return (
      <div className="d-flex justify-content-between">
        <Link to={this.props.editPath} className="btn btn-sm btn-info">
          <span className="fas fa-edit" />
          Edit
        </Link>
        <button className="btn btn-danger btn-sm" onClick={this.handleDeletion}>
          <span className="fas fa-trash" />
          Delete
        </button>
      </div>
    );
  }
}
