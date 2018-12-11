import Log from "../../services/log";
import { generateNewArticle } from "../../components/products/Article";

// Actions
const LOAD = "learnzone/article/LOAD";
const LOADED = "learnzone/article/LOADED";
const LIST_LOAD = "learnzone/article/LIST_LOAD";
const LIST_LOADED = "learnzone/article/LIST_LOADED";
const CLEAR = "learnzone/article/CLEAR";
const NEW = "learnzone/article/NEW";
const CREATE = "learnzone/article/CREATE";
const CREATED = "learnzone/article/CREATED";
const UPDATE = "learnzone/article/UPDATE";
const UPDATED = "learnzone/article/UPDATED";
const DELETE = "learnzone/article/DELETE";
const DELETED = "learnzone/article/DELETED";

// Reducers
const reducer = (state = {}, action = {}) => {
  switch (action.type) {
    // Requested entity list is loaded
    case LIST_LOADED:
      const articles = action.payload;
      Log.info(`Loaded ${articles.length} articles(s)`, {
        tags: ["Redux", "Article"]
      });
      return { ...state, list: articles };

    // entity is loaded
    case LOADED:
      Log.info(`Loaded #${action.payload.id}`, { tags: ["Redux", "Article"] });
      return { ...state, entity: action.payload };

    // Clear current entity
    case CLEAR:
      return { ...state, entity: undefined };

    // new non-saved entity
    case NEW:
      return { ...state, entity: generateNewArticle() };

    // Entity is created
    case CREATED:
      Log.info(`Created`, action.payload, { tags: ["Redux", "Article"] });
      return { ...state, entity: action.payload };

    // Entity is updated
    case UPDATED:
      Log.info(`Updated`, action.payload, { tags: ["Redux", "Catalog"] });
      return { ...state, entity: action.payload };

    // Entity is deleted
    case DELETED:
      const id = action.payload;
      Log.info(`Deleted article#${id}`, { tags: ["Redux", "Article"] });
      const updatedList = state.list.filter(article => article.id !== id);
      return {
        ...state,
        list: updatedList
      };

    default:
      return state;
  }
};
export default reducer;

// Action creator
const loadArticles = () => ({ type: LIST_LOAD });
const loadArticle = id => ({ type: LOAD, payload: id });
const clearArticle = () => ({ type: CLEAR });
const newArticle = () => ({ type: NEW });
const createArticle = (article, meta) => ({
  type: CREATE,
  payload: article,
  meta
});
const updateArticle = (article, meta) => ({
  type: UPDATE,
  payload: article,
  meta
});
const deleteArticle = (id, meta) => ({ type: DELETE, payload: id, meta });

export {
  LOAD,
  LOADED,
  LIST_LOAD,
  LIST_LOADED,
  CLEAR,
  NEW,
  CREATE,
  CREATED,
  UPDATE,
  UPDATED,
  DELETE,
  DELETED,
  loadArticles,
  loadArticle,
  clearArticle,
  newArticle,
  createArticle,
  updateArticle,
  deleteArticle
};
