import { ArticleList } from "../../components/products/Article";
import entitiesHandler from "../hoc/entitiesHandler";
import { api_get, api_delete } from "../../api";

const ArticlesContainer = entitiesHandler(ArticleList, {
  load: () => api_get("/articles"),
  delete: id => api_delete(`/articles/${id}`)
});

export default ArticlesContainer;
