import React from "react";
import CRUD from "../../api/crud";
import auth from "../../services/auth";
import history from "../../routes/history";

/**
 *
 * @param {Component} FormComponent edition mode
 * @param {Component} DetailComponent display mode
 * @param {Object} crudFunctions Must define functions: `new(), `create(entity)`,
 * `update(entity)`, `redirect(id)`, `load(id)`
 */
function entityHandler(FormComponent, DetailComponent, crudFunctions) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        editing: this.isEditing(props.crud),
        redirect: undefined,
        entity: this.props.crud === CRUD.NEW ? crudFunctions.new() : undefined
      };
      this.name = FormComponent.name + DetailComponent.name;

      console.log(
        `[entityHandler.new] for ${this.name} props: ${JSON.stringify(props)}`
      );
    }

    componentDidMount() {
      let id = this.props.match.params.id;
      // hard coded "new" id
      if (id && id !== CRUD.NEW) {
        console.log(`${this.name} loading #${id}`);
        crudFunctions
          .load(this.props.match.params.id)
          .then(response => response.json())
          .then(data => this.setState({ entity: data }));
      } else {
        console.log("No loading entity");
      }
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
        crudFunctions
          .update(this.state.entity)
          .catch(err => console.err("Error: " + err));
        this.disableEditionMode();
      }
      // no id: creating new entity
      else {
        crudFunctions
          .create(this.state.entity)
          .then(response => response.json())
          .then(data => {
            console.log(`receive data ${JSON.stringify(data)}`);
            if (data) {
              history.replace(crudFunctions.redirect(data.id));
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

    render() {
      // render detail or form only if entity is loaded
      if (this.state.entity) {
        return this.state.editing ? (
          // rendering new or edit form
          <FormComponent
            entity={this.state.entity}
            handleFormSubmit={this.handleFormSubmit}
            handleValueChange={this.handleValueChange}
          />
        ) : (
          // rendering entity details
          <DetailComponent
            entity={this.state.entity}
            enableEditionMode={this.enableEditionMode}
            auth={auth}
          />
        );
      }
      // Hold on!
      else {
        return <div>Loading entity...</div>;
      }
    }
  };
}

export default entityHandler;
