import React from "react";
import IdHiddenInput from "../utils/IdHiddenInput";
import PropTypes from "prop-types";
import { ARTICLE_ATTRIBUTES } from "./Article";

/**
 * Article form
 * @param {*} props
 */
function ArticleForm(props) {
  return (
    <div className="container">
      <form onSubmit={props.handleFormSubmit}>
        <IdHiddenInput id={props.entity.id} />

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

ArticleForm.propTypes = {
  entity: PropTypes.shape(ARTICLE_ATTRIBUTES).isRequired,
  handleValueChange: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired
};

export default ArticleForm;
