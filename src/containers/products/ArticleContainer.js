import { ArticleForm, ArticleDetail } from "../../components/products/Article";
import entityHandler from "../hoc/entityHandler";
import { api_get, api_post, api_patch } from "../../api";
import PropTypes from "prop-types";

const ArticleContainer = entityHandler(ArticleForm, ArticleDetail, {
  new: () => ({
    name: ""
  }),
  load: id => api_get(`/articles/${id}`),
  create: article => api_post(`/articles/`, article),
  update: article => api_patch(`/articles/${article.id}`, article),
  redirect: id => `/articles/${id}`
});

ArticleContainer.propTypes = {
  crud: PropTypes.string
};

export default ArticleContainer;
