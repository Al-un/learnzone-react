import Log from "../../services/log";

// Actions
const LOAD = "learnzone/article/LOAD";
const LOADED = "learnzone/article/LOADED";
const CREATE = "learnzone/article/CREATE";
const CREATED = "learnzone/article/CREATED";
const UPDATE = "learnzone/article/UPDATE";
const UPDATED = "learnzone/article/UPDATED";
const DELETE = "learnzone/article/DELETE";
const DELETED = "learnzone/article/DELETED";

// Reducers
const reducer = (state = {}, action = {}) => {
  switch (action.type) {
    case LOADED:
      const articles = action.payload;
      Log.info(`Loaded ${articles.length} articles(s)`, {
        tags: ["Redux", "Article"]
      });
      return { ...state, list: articles };

    case DELETED:
      const id = action.payload;
      Log.info(`Deleted article#${id}`, { tags: ["Redux", "Article"] });
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

// Action creator
const loadArticles = () => ({ type: LOAD });
const createArticle = article => ({ type: CREATE, payload: article });
const updateArticle = article => ({ type: UPDATE, payload: article });
const deleteArticle = article => ({ type: DELETE, payload: article });

export {
  LOAD,
  LOADED,
  CREATE,
  CREATED,
  UPDATE,
  UPDATED,
  DELETE,
  DELETED,
  loadArticles,
  createArticle,
  updateArticle,
  deleteArticle
};
