import { CatalogForm, CatalogDetail } from "../../components/products/Catalog";
import entityHandler from "../hoc/entityHandler";
import { api_get, api_post, api_patch } from "../../api";

const CatalogContainer = entityHandler(CatalogForm, CatalogDetail, {
  new: () => ({
    name: "",
    code: ""
  }),
  load: id => api_get(`/catalogs/${id}`),
  create: catalog => api_post(`/catalogs/`, catalog),
  update: catalog => api_patch(`/catalogs/${catalog.id}`, catalog),
  redirect: id => `/catalogs/${id}`
});

export default CatalogContainer;
