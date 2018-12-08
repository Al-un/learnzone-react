import React from "react";
import CRUD from "../../api/crud";
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
        // console.log(`${this.name} loading #${id}`);
        crudFunctions
          .load(this.props.match.params.id)
          .then(response => response.json())
          .then(data => {
            console.log(`Received data for entity#${id}: ${JSON.stringify(data)}`);
            // console.log(data);
            this.setState({ entity: data });
          });
      } else {
        console.log("No loading entity");
      }
    }

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
          .then(resp => {
            console.log(`receive update response ${JSON.stringify(resp)}`);
            history.replace(crudFunctions.redirect(this.state.entity.id));
          })
          .catch(err => console.err("Error: " + err));
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
            } else {
              console.err(
                "data not received: to be handled (entityHandler#handleFormSubmit)"
              );
            }
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
        return CRUD.NEW === this.props.crud || CRUD.EDIT === this.props.crud ? (
          // rendering new or edit form
          <FormComponent
            entity={this.state.entity}
            handleFormSubmit={this.handleFormSubmit}
            handleValueChange={this.handleValueChange}
          />
        ) : (
          // rendering entity details
          <DetailComponent entity={this.state.entity} />
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
