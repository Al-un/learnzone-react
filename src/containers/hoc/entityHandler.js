import React from "react";
import CRUD from "../../api/crud";
import Log from "../../services/log";

/**
 *
 * @param {Component} FormComponent edition mode
 * @param {Component} DetailComponent display mode
 */
function entityHandler(FormComponent, DetailComponent) {
  return class extends React.Component {
    componentDidMount() {
      let id = this.props.match.params.id;
      Log.info(`Mounting entityHandler: ${id}`);
      // hard coded "new" id
      if (id && id !== CRUD.NEW) {
        this.props.load(id);
      } else {
        this.props.new();
      }
    }

    componentDidUpdate(){
      Log.info(`Updating entityHandler`);
    }

    componentWillUnmount(){
      this.props.unmount();
    }

    /**
     * Submit the form from the FormComponent. The submitEntityFn handles
     * creation or update distinction
     */
    saveEntity = entity => {
      // Log.debug(`submitting entity ${JSON.stringify(this.state)}`);

      // Distinguish create or update
      // Cannot rely on props.crud as a new entitiy might be edited again
      if (entity.id) {
        this.props.update(entity);
      }
      // no id: creating new entity
      else {
        this.props.create(entity);
      }
    };

    render() {
      // render detail or form only if entity is loaded
      if (this.props.entity) {
        return CRUD.NEW === this.props.crud || CRUD.EDIT === this.props.crud ? (
          // rendering new or edit form
          <FormComponent
            entity={this.props.entity}
            saveEntity={entity => this.saveEntity(entity)}
            handleValueChange={this.handleValueChange}
          />
        ) : (
          // rendering entity details
          <DetailComponent
            entity={this.props.entity}
            deleteById={id => this.props.deleteById(id)}
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
