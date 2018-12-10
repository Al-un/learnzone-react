import PropTypes from "prop-types";

/**
 * API root path
 */
const CATALOG_API_PATH = "/catalogs";
/**
 * UI root path
 */
const CATALOG_PATH = "/catalogs";
/**
 * Catalog definition
 */
const CATALOG_ATTRIBUTES = {
  id: PropTypes.number,
  code: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  user_id: PropTypes.number
};

const generateNewCatalog = () => ({
  code: "",
  name: ""
});

export {
  CATALOG_API_PATH,
  CATALOG_PATH,
  CATALOG_ATTRIBUTES,
  generateNewCatalog
};
