import React from "react";
import { Link } from "react-router-dom";
import EditDeleteButtonsRow from "./EditDeleteButtonsRow";

export default class CatalogList extends React.Component {
  render() {
    return (
      <div className="container-fluid catalogs-list">
        <h3>Catalogs</h3>
        <div className="row">
          {this.props.entities.map((catalog, index) => (
            <div key={catalog.id} className="col-12 col-md-3 mt-3">
              <div className="card">
                <Link to={`/catalogs/${catalog.id}`}>
                  <div className="card-header">
                    <span>
                      {catalog.code}: {catalog.name}
                    </span>
                  </div>
                  <div className="card-body">
                    <p>{catalog.description}</p>
                  </div>
                </Link>
                <div className="card-footer">
                  <EditDeleteButtonsRow
                    editPath={`/catalogs/${catalog.id}/edit`}
                    deleteEntity={() => this.props.deleteEntity(catalog.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <Link to="/catalogs/new" className="btn btn-outline-primary">
            <span className="fas fa-plus" />
            <span>Create a catalog</span>
          </Link>
        </div>
      </div>
    );
  }
}
