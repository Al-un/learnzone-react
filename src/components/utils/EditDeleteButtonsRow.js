import React from "react";
import { Link } from "react-router-dom";
import auth from "../../services/auth";
import PropTypes from "prop-types";
import { DeleteButton } from "./Buttons";

/**
 * Rendering a line of *edit* and *delete* buttons if the current user is
 *  authenticated
 */
export default class EditDeleteButtonsRow extends React.Component {
  /**
   * Ensure confirmation before deletion. Confirmation message can be customized
   * via the `deleteMsg` props
   */
  deleteFunc = () => {
    let confirmMsg = this.props.deleteMsg || "Confirm deletion?";
    let confirmDel = window.confirm(confirmMsg);
    if (confirmDel) {
      this.props.deleteFunc();
    }
  };

  /**
   * Rendering with a bootstrap flex
   */
  render() {
    return auth.isAuthenticated() ? (
      // allowed to edit/delete
      <div className="d-flex justify-content-between">
        <Link to={this.props.editPath} className="btn btn-sm btn-info">
          <span className="fas fa-edit" />
          Edit
        </Link>

        <DeleteButton deleteFunc={this.deleteFunc} />
      </div>
    ) : (
      // TODO: how to display it?
      <div className="unauthorized" />
    );
  }
}

EditDeleteButtonsRow.propTypes = {
  editPath: PropTypes.string.isRequired,
  deleteFunc: PropTypes.func.isRequired,
  deleteMsg: PropTypes.string
};
