import PropTypes from "prop-types";
import CatalogForm from "./CatalogForm";
import CatalogDetail from "./CatalogDetail";
import CatalogList from "./CatalogList";
import { api_get, api_post, api_patch } from "../../api";

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

const CATALOG_CRUD = {
  new: () => ({
    name: "",
    code: ""
  }),
  load: id => api_get(`/catalogs/${id}`),
  create: catalog => api_post(`/catalogs/`, catalog),
  update: catalog => api_patch(`/catalogs/${catalog.id}`, catalog),
  redirect: id => `/catalogs/${id}`
};

export {
  CATALOG_ATTRIBUTES,
  CATALOG_CRUD,
  CatalogForm,
  CatalogDetail,
  CatalogList
};
