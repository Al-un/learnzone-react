import { CatalogList } from "../../components/products/Catalog";
import entitiesHandler from "../hoc/entitiesHandler";
import { loadCatalogs, deleteCatalog } from "../../redux/products/catalog";
import { connect } from "react-redux";

const mapStateToProps = state => ({ entities: state.catalogs.list });

const mapDispatchToProps = dispatch => {
  return {
    load: () => dispatch(loadCatalogs(dispatch)),
    delete: id => dispatch(deleteCatalog(id))
  };
};

// const CatalogsContainer = entitiesHandler(CatalogList);
// const CatalogsContainer = entitiesHandler(CatalogList, {
//   load: () => api_get("/catalogs"),
//   delete: id => api_delete(`/catalogs/${id}`)
// });

const ReduxedCatalogs = connect(
  mapStateToProps,
  mapDispatchToProps
)(entitiesHandler(CatalogList));

export default ReduxedCatalogs;
