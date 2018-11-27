import Catalog from "../components/Catalog";
import entityHandlerHoc from "./utils/entityHandlerHoc";

const newEntity = () => ({
  name: "",
  code: ""
});

const loadEntity = () => ({
  id: 1,
  name: "Name",
  code: "Code",
  description: "Description",
  createdAt: "xxx",
  updatedAt: "xxx",
  user_id: 1
});

const CatalogContainer = entityHandlerHoc(Catalog, newEntity, loadEntity);

export default CatalogContainer;
