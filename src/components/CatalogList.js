import React from "react";
import { Link } from "react-router-dom";

export default class CatalogList extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          {this.props.catalogs.map((catalog, index) => (
            <div key={catalog.id} className="col">
              <Link to={`/catalogs/${catalog.id}`}>
                <div className="card">
                  <div className="card-header">
                    <span>
                      {catalog.code}: {catalog.name}
                    </span>
                  </div>
                  <div className="card-body">
                    <p>{catalog.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
