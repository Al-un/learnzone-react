import {
  CatalogForm,
  CatalogDetail,
  CATALOG_CRUD
} from "../../components/products/Catalog";
import entityHandler from "../hoc/entityHandler";
import PropTypes from "prop-types";

const CatalogContainer = entityHandler(
  CatalogForm,
  CatalogDetail,
  CATALOG_CRUD
);

CatalogContainer.propTypes = {
  crud: PropTypes.string
};

export default CatalogContainer;
