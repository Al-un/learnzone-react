import React from "react";

/**
 * This HoC switches between a display only mode and an edition form.
 * @param {Component} FormComponent edition mode
 * @param {Component} DetailComponent display mode
 * @param {Function} submitEntityFn function to call whenever the form is submitted
 */
function toggleEditDisplayHoc(FormComponent, DetailComponent, submitEntityFn) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      console.log(`props: ${JSON.stringify(props)}`);
      this.state = {
        editing: this.isEditing(props.crud),
        entity: props.entity
      };
      // console.log(`loading entity ${JSON.stringify(this.state)}`);
    }

    /**
     *
     * @param {String} crud crud status
     * @return true if crud triggers edition
     */
    isEditing(crud) {
      return "new" === crud || "edit" === crud;
    }

    /**
     * Switch to edition mode
     */
    enableEditionMode = event => {
      this.setState({ editing: true });
    };

    /**
     * Switch to display only
     */
    disableEditionMode = event => {
      this.setState({ editing: false });
    };

    /**
     * Submit the form from the FormComponent. The submitEntityFn handles
     * creation or update distinction
     */
    handleFormSubmit = event => {
      event.preventDefault();
      this.disableEditionMode();
      console.log(`submitting entity ${JSON.stringify(this.state)}`);
      submitEntityFn(this.state.entity);
    };

    /**
     * Update the local state whenever a input is modified
     */
    handleValueChange = event => {
      // console.log(`New value of ${event.target.name} is ${event.target.value}`);
      this.setState({
        entity: {
          ...this.state.entity,
          [event.target.name]: event.target.value
        }
      });
      // console.log(`updating entity ${JSON.stringify(this.state)}`);
    };

    /**
     * Conditionally render the form or the display only
     */
    render() {
      return this.state.editing ? (
        <FormComponent
          entity={this.state.entity}
          handleFormSubmit={this.handleFormSubmit}
          handleValueChange={this.handleValueChange}
        />
      ) : (
        <DetailComponent
          entity={this.state.entity}
          enableEditionMode={this.enableEditionMode}
        />
      );
    }
  };
}

export default toggleEditDisplayHoc;
