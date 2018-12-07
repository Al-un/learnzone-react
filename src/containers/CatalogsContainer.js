import { CatalogList } from "../components/Catalog";
import entitiesHandler from "./hoc/entitiesHandler";
import { api_get, api_delete } from "../api";

const CatalogsContainer = entitiesHandler(CatalogList, {
  load: () => api_get("/catalogs"),
  delete: id => api_delete(`/catalogs/${id}`)
});

export default CatalogsContainer;
