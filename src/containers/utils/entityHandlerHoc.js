import React from "react";

function entityHandlerHoc(WrappedComponent, newEntityFn, loadEntityFn) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      //   console.log(`props: ${JSON.stringify(props)}`);

      this.state = {
        entity: this.props.crud === "new" ? newEntityFn() : loadEntityFn()
      };
    }

    render() {
      return (
        <div>
          <WrappedComponent
            entity={this.state.entity}
            editing={this.state.editing}
            crud={this.props.crud}
          />
        </div>
      );
    }
  };
}

export default entityHandlerHoc;
