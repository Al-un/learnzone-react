import React from "react";
import { Link } from "react-router-dom";
import EditDeleteButtonsRow from "../utils/EditDeleteButtonsRow";
import auth from "../../services/auth";
import PropTypes from "prop-types";
import { CreateButton } from "../utils/Buttons";
import { CATALOG_PATH } from "./Catalog";

/**
 * Catalogs list
 * @param {*} props
 */
function CatalogList(props) {
  return (
    <div className="container-fluid catalogs-list">
      <h3>Catalogs</h3>
      <div className="row">
        {props.entities.map((catalog, index) => (
          <div key={catalog.id} className="col-12 col-md-3 mt-3">
            <div className="card">
              <Link to={`${CATALOG_PATH}/${catalog.id}`}>
                <div className="card-header">
                  <span>
                    {catalog.id}: {catalog.name}
                  </span>
                </div>

                <div className="card-body">
                  <p className="card-text">{catalog.description}</p>
                  <p className="card-text">
                    {catalog.publications_count} article(s)
                  </p>
                </div>
              </Link>

              <div className="card-footer">
                <span>Owner: {catalog.user.auth0_id}</span>
                <EditDeleteButtonsRow
                  editPath={`${CATALOG_PATH}/${catalog.id}/edit`}
                  deleteFunc={() => props.deleteEntity(catalog.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {auth.isAuthenticated() && (
        <div className="row">
          <CreateButton url={`${CATALOG_PATH}/new`} value="Create a catalog" />
        </div>
      )}
    </div>
  );
}

CatalogList.propTypes = {
  entities: PropTypes.array.isRequired,
  deleteEntity: PropTypes.func.isRequired
};

export default CatalogList;
