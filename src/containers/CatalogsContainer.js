import CatalogList from "../components/CatalogList";
import entitiesHandlerHoc from "./utils/entitiesHandlerHoc";
import { api_get, api_delete } from "../api";

const CatalogsContainer = entitiesHandlerHoc(CatalogList, {
  load: () => api_get("/catalogs"),
  delete: id => api_delete(`/catalogs/${id}`)
});

export default CatalogsContainer;
