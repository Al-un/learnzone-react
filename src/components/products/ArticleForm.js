import React from "react";
import IdHiddenInput from "../utils/IdHiddenInput";
import PropTypes from "prop-types";
import { ARTICLE_ATTRIBUTES } from "./Article";

/**
 * Article form
 * @param {*} props
 */
class ArticleForm extends React.Component {
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
              className="w-100"
              type="text"
              name="name"
              placeholder="Name"
              required={true}
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

          <button type="submit" className="btn btn-success btn-lg">
            Save
          </button>
        </form>
      </div>
    );
  }
}

ArticleForm.propTypes = {
  entity: PropTypes.shape(ARTICLE_ATTRIBUTES).isRequired,
  saveEntity: PropTypes.func.isRequired
};

export default ArticleForm;
