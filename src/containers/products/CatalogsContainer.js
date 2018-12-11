// -------------------- Import
// React
import { connect } from "react-redux";
// HOC
import entitiesHandler from "../hoc/entitiesHandler";
// Products
import CatalogList from "../../components/products/CatalogList";
import { loadCatalogs, deleteCatalog } from "../../redux/products/catalog";

// -------------------- Redux def
const mapStateToProps = state => ({ entities: state.catalogs.list });

const mapDispatchToProps = dispatch => {
  return {
    load: () => dispatch(loadCatalogs()),
    delete: id => dispatch(deleteCatalog(id))
  };
};

const CatalogsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(entitiesHandler(CatalogList));

// -------------------- Export
export default CatalogsContainer;
