import Log from "../../services/log";
import { generateNewCatalog } from "../../components/products/Catalog";

// Actions
const LOAD = "learnzone/catalog/LOAD";
const LOADED = "learnzone/catalog/LOADED";
const CLEAR = "learnzone/catalog/CLEAR";
const LIST_LOAD = "learnzone/catalog/LIST_LOAD";
const LIST_LOADED = "learnzone/catalog/LIST_LOADED";
const NEW = "learnzone/catalog/NEW";
const CREATE = "learnzone/catalog/CREATE";
const CREATED = "learnzone/catalog/CREATED";
const UPDATE = "learnzone/catalog/UPDATE";
const UPDATED = "learnzone/catalog/UPDATED";
const DELETE = "learnzone/catalog/DELETE";
const DELETED = "learnzone/catalog/DELETED";

// Reducers
const reducer = (state = {}, action = {}) => {
  switch (action.type) {
    // Catalogs are loaded
    case LIST_LOADED:
      const catalogs = action.payload;
      Log.info(`Loaded ${catalogs.length} catalog(s)`, {
        tags: ["Redux", "Catalog"]
      });
      return { ...state, list: catalogs };

    // entity is loaded
    case LOADED:
      Log.info(`Loaded #${action.payload.id}`, { tags: ["Redux", "Catalog"] });
      return { ...state, entity: action.payload };

    // Clear current entity
    case CLEAR:
      return { ...state, entity: undefined };

    // new non-saved entity
    case NEW:
      return { ...state, entity: generateNewCatalog() };

    // Entity is created
    case CREATED:
      Log.info(`Created`, action.payload, { tags: ["Redux", "Catalog"] });
      return { ...state, entity: action.payload };

    // Entity is updated
    case UPDATED:
      Log.info(`Updated`, action.payload, { tags: ["Redux", "Catalog"] });
      return { ...state, entity: action.payload };

    // Entity is deleted
    case DELETED:
      const id = action.payload;
      Log.info(`Deleted catalog#${id}`, { tags: ["Redux", "Catalog"] });
      const updatedList = state.list.filter(catalog => catalog.id !== id);
      return {
        ...state,
        list: updatedList
      };

    default:
      return state;
  }
};
export default reducer;

// Actions creator
const loadCatalogs = () => ({ type: LIST_LOAD });
const loadCatalog = id => ({ type: LOAD, payload: id });
const clearCatalog = () => ({ type: CLEAR });
const newCatalog = () => ({ type: NEW });
const createCatalog = (catalog, meta) => ({
  type: CREATE,
  payload: catalog,
  meta
});
const updateCatalog = (catalog, meta) => ({
  type: UPDATE,
  payload: catalog,
  meta
});
const deleteCatalog = (id, meta) => ({ type: DELETE, payload: id, meta });

export {
  LOAD,
  LOADED,
  NEW,
  CLEAR,
  LIST_LOAD,
  LIST_LOADED,
  CREATE,
  CREATED,
  UPDATE,
  UPDATED,
  DELETE,
  DELETED,
  loadCatalogs,
  loadCatalog,
  clearCatalog,
  newCatalog,
  createCatalog,
  updateCatalog,
  deleteCatalog
};
