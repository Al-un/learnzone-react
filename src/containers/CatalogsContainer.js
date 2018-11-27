import React from "react";
import { Link } from "react-router-dom";
import CatalogList from "../components/CatalogList";

export default class CatalogsContainer extends React.Component {
  dummyData() {
    return [
      {
        id: 1,
        name: "Name",
        code: "code",
        description: "Description",
        createdAt: "xxx",
        updatedAt: "xxx",
        user_id: 1
      },
      {
        id: 2,
        name: "Name",
        code: "code",
        description: "Description",
        createdAt: "xxx",
        updatedAt: "xxx",
        user_id: 1
      },
      {
        id: 3,
        name: "Name",
        code: "code",
        description: "Description",
        createdAt: "xxx",
        updatedAt: "xxx",
        user_id: 1
      },
      {
        id: 4,
        name: "Name",
        code: "code",
        description: "Description",
        createdAt: "xxx",
        updatedAt: "xxx",
        user_id: 1
      }
    ];
  }

  render() {
    return (
      <div>
        <h3>Catalogs</h3>
        <CatalogList catalogs={this.dummyData()} />
        <Link to="/catalogs/new" className="btn btn-outline-primary mt-3">
          Add a new catalog
        </Link>
      </div>
    );
  }
}
