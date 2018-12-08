import Log from "../../services/log";

// Actions
const LOAD = "learnzone/catalog/LOAD";
const LOADED = "learnzone/catalog/LOADED";
const CREATE = "learnzone/catalog/CREATE";
const CREATED = "learnzone/catalog/CREATED";
const UPDATE = "learnzone/catalog/UPDATE";
const UPDATED = "learnzone/catalog/UPDATED";
const DELETE = "learnzone/catalog/DELETE";
const DELETED = "learnzone/catalog/DELETED";

// Reducers
const reducer = (state = {}, action = {}) => {
  switch (action.type) {
    case LOADED:
      const catalogs = action.payload;
      Log.info(`Loaded ${catalogs.length} catalog(s)`, {
        tags: ["Redux", "Catalog"]
      });
      return { ...state, list: catalogs };

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
const loadCatalogs = dispatch => ({
  type: LOAD,
  postProcessing: catalogs => dispatch(loadedCatalogs(catalogs))
});
const loadedCatalogs = catalogs => ({
  type: LOADED,
  payload: catalogs
});
const createCatalog = catalog => ({ type: CREATE, payload: catalog });
const updateCatalog = catalog => ({ type: UPDATE, payload: catalog });
const deleteCatalog = id => ({ type: DELETE, payload: id });

export {
  LOAD,
  LOADED,
  CREATE,
  CREATED,
  UPDATE,
  UPDATED,
  DELETE,
  DELETED,
  loadCatalogs,
  createCatalog,
  updateCatalog,
  deleteCatalog
};
