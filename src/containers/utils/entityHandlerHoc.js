import React from "react";
import CRUD from "../../api/crud";

/**
 *
 * @param {*} WrappedComponent
 * @param {Object} entityFunctions Must define "new" and "load(id)" functions
 */
function entityHandlerHoc(WrappedComponent, entityFunctions) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        entity: this.props.crud === CRUD.NEW ? entityFunctions.new() : undefined
      };
      console.log(
        `[entityHandlerHoc.construct] for ${
          WrappedComponent.name
        } with props: ${JSON.stringify(props)}`
      );
    }

    componentDidMount() {
      let id = this.props.match.params.id;
      if (id) {
        console.log(`${WrappedComponent.name} loading #${id}`);
        entityFunctions
          .load(this.props.match.params.id)
          .then(response => response.json())
          .then(data => this.setState({ entity: data }));
      } else {
        console.log("No loading entity");
      }
    }

    render() {
      return this.state.entity ? (
        <div>
          <WrappedComponent
            entity={this.state.entity}
            editing={this.state.editing}
            crud={this.props.crud}
          />
        </div>
      ) : (
        <div>Loading...</div>
      );
    }
  };
}

export default entityHandlerHoc;
