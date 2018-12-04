import React from "react";
import CRUD from "../../api/crud";
import auth from "../../services/auth";
import history from "../../routes/history";

/**
 * This HoC switches between a display only mode and an edition form.
 * @param {Component} FormComponent edition mode
 * @param {Component} DetailComponent display mode
 * @param {Object} entityFunctions Must define "create" and "update" functions
 */
function toggleEditDisplayHoc(FormComponent, DetailComponent, entityFunctions) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      console.log(
        `[toggleEditDisplayHoc.construct] for ${
          DetailComponent.name
        } with props: ${JSON.stringify(props)}`
      );
      this.state = {
        editing: this.isEditing(props.crud),
        entity: props.entity,
        redirect: undefined
      };
      this.name = FormComponent.name + DetailComponent.name;
      // console.log(`loading entity ${JSON.stringify(this.state)}`);
    }

    /**
     *
     * @param {String} crud crud status
     * @return true if crud triggers edition
     */
    isEditing(crud) {
      return CRUD.NEW === crud || CRUD.EDIT === crud;
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
      // Not using standard form feature
      event.preventDefault();
      // console.log(`submitting entity ${JSON.stringify(this.state)}`);

      // Distinguish create or update
      // Cannot rely on props.crud as a new entitiy might be edited again
      if (this.state.entity.id) {
        entityFunctions
          .update(this.state.entity)
          .catch(err => console.err("Error: " + err));
        this.disableEditionMode();
      }
      // no id: creating new entity
      else {
        entityFunctions
          .create(this.state.entity)
          .then(response => response.json())
          .then(data => {
            console.log(`receive data ${JSON.stringify(data)}`);
            if (data) {
              history.replace(entityFunctions.redirect(data.id));
            }
            this.disableEditionMode();
          })
          .catch(err => console.err("Error: " + err));
      }
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
          auth={auth}
        />
      );
    }
  };
}

export default toggleEditDisplayHoc;
