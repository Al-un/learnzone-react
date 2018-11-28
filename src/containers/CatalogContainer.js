import Catalog from "../components/Catalog";
import entityHandlerHoc from "./utils/entityHandlerHoc";
import { api_get } from "../api";

const CatalogContainer = entityHandlerHoc(Catalog, {
  new: () => ({
    name: "",
    code: ""
  }),
  load: id => api_get(`/catalogs/${id}`)
});

export default CatalogContainer;
