import {
  ArticleForm,
  ArticleDetail,
  ARTICLE_CRUD
} from "../../components/products/Article";
import entityHandler from "../hoc/entityHandler";
import PropTypes from "prop-types";

const ArticleContainer = entityHandler(
  ArticleForm,
  ArticleDetail,
  ARTICLE_CRUD
);

ArticleContainer.propTypes = {
  crud: PropTypes.string
};

export default ArticleContainer;
