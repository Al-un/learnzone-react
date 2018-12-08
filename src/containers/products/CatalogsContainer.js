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

const CatalogsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(entitiesHandler(CatalogList));

export default CatalogsContainer;
