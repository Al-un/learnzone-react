import React from "react";

/**
 *
 * @param {*} WrappedComponent
 */
function entitiesHandler(WrappedComponent) {
  return class extends React.Component {
    componentDidMount() {
      this.props.load();
    }

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
