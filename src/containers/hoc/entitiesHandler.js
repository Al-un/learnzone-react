import React from "react";

/**
 *
 * @param {*} WrappedComponent
 * @param {Object} entityFunctions Must define "load" and "delete(id)" functions
 */
function entitiesHandler(WrappedComponent, entityFunctions) {
  return class extends React.Component {
    // constructor(props) {
    //   super(props);
    //   //   console.log(`props: ${JSON.stringify(props)}`);

    //   this.state = {
    //     entities: undefined
    //   };
    //   console.log(
    //     `[entitiesHandlerHoc.construct] for ${WrappedComponent.name}`
    //   );
    // }

    componentDidMount() {
      this.props.load();
      // entityFunctions
      //   .load()
      //   .then(response => response.json())
      //   .then(data => this.setState({ entities: data }));
    }

    // deleteEntity(id) {
    //   this.props.delete(id);
    //   entityFunctions
    //     .delete(id)
    //     .then(response => {
    //       if (response.status === 204) {
    //         this.setState(prevState => ({
    //           entities: prevState.entities.filter(entity => entity.id !== id)
    //         }));
    //       }
    //     })
    //     .catch(err =>
    //       console.err(
    //         `Error when deleting ${WrappedComponent.name}#${id}: ${err}`
    //       )
    //     );
    // }

    render() {
      return this.props.entities ? (
        <div>
          <WrappedComponent
            entities={this.props.entities}
            deleteEntity={id => this.props.delete(id)}
          />
        </div>
      ) : (
        <div>Loading list...</div>
      );
    }
  };
}

export default entitiesHandler;
