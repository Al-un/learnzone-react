import PropTypes from "prop-types";
import ArticleForm from "./ArticleForm";
import ArticleDetail from "./ArticleDetail";
import ArticleList from "./ArticleList";
import { api_get, api_post, api_patch } from "../../api";

const ARTICLE_ATTRIBUTES = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  user_id: PropTypes.number
};

const ARTICLE_CRUD = {
  new: () => ({
    name: ""
  }),
  load: id => api_get(`/articles/${id}`),
  create: article => api_post(`/articles/`, article),
  update: article => api_patch(`/articles/${article.id}`, article),
  redirect: id => `/articles/${id}`
};

export {
  ARTICLE_ATTRIBUTES,
  ARTICLE_CRUD,
  ArticleForm,
  ArticleDetail,
  ArticleList
};
