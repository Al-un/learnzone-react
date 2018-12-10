// -------------------- Import
// React
import { connect } from "react-redux";
// HOC
import entityHandler from "../hoc/entityHandler";
// Products
import CatalogForm from "../../components/products/CatalogForm";
import CatalogDetail from "../../components/products/CatalogDetail";
import {
  loadCatalog,
  newCatalog,
  createCatalog,
  updateCatalog,
  deleteCatalog,
  clearCatalog
} from "../../redux/products/catalog";
import history from "../../routes/history";
import { CATALOG_PATH } from "../../components/products/Catalog";

const mapStateToProps = state => ({ entity: state.catalogs.entity });

const mapDispatchToProps = dispatch => {
  return {
    load: id => dispatch(loadCatalog(id)),
    new: () => dispatch(newCatalog()),
    create: catalog =>
      dispatch(
        createCatalog(catalog, {
          postProcessing: catalog =>
            history.push(`${CATALOG_PATH}/${catalog.id}`)
        })
      ),
    update: catalog =>
      dispatch(
        updateCatalog(catalog, {
          postProcessing: catalog =>
            history.push(`${CATALOG_PATH}/${catalog.id}`)
        })
      ),
    deleteById: id =>
      dispatch(
        deleteCatalog(id, {
          postProcessing: () => history.push(`${CATALOG_PATH}`)
        })
      ),
    unmount: () => dispatch(clearCatalog())
  };
};

const CatalogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(entityHandler(CatalogForm, CatalogDetail));

export default CatalogContainer;
