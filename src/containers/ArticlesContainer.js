import ArticleList from "../components/ArticleList";
import entitiesHandlerHoc from "./utils/entitiesHandlerHoc";
import { api_get, api_delete } from "../api";

const ArticlesContainer = entitiesHandlerHoc(ArticleList, {
  load: () => api_get("/articles"),
  delete: id => api_delete(`/articles/${id}`)
});

export default ArticlesContainer;
