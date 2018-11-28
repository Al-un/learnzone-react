import Article from "../components/Article";
import entityHandlerHoc from "./utils/entityHandlerHoc";
import { api_get } from "../api";

const ArticleContainer = entityHandlerHoc(Article, {
  new: () => ({
    name: ""
  }),
  load: id => api_get(`/articles/${id}`)
});

export default ArticleContainer;
