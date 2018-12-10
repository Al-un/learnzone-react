// -------------------- Import
// React
import { connect } from "react-redux";
// HOC
import entityHandler from "../hoc/entityHandler";
// Products
import ArticleForm from "../../components/products/ArticleForm";
import ArticleDetail from "../../components/products/ArticleDetail";
import {
  deleteArticle,
  loadArticle,
  newArticle,
  createArticle,
  updateArticle,
  clearArticle
} from "../../redux/products/article";
import history from "../../routes/history";
import { ARTICLE_PATH } from "../../components/products/Article";

// -------------------- Redux def
const mapStateToProps = state => ({ entity: state.articles.entity });

const mapDispatchToProps = dispatch => {
  return {
    load: id => dispatch(loadArticle(id)),
    new: () => dispatch(newArticle()),
    create: article =>
      dispatch(
        createArticle(article, {
          postProcessing: article =>
            history.push(`${ARTICLE_PATH}/${article.id}`)
        })
      ),
    update: article =>
      dispatch(
        updateArticle(article, {
          postProcessing: article =>
            history.push(`${ARTICLE_PATH}/${article.id}`)
        })
      ),
    deleteById: id =>
      dispatch(
        deleteArticle(id, {
          postProcessing: () => history.push(`${ARTICLE_PATH}`)
        })
      ),
    unmount: () => dispatch(clearArticle())
  };
};

const ArticleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(entityHandler(ArticleForm, ArticleDetail));

// -------------------- Export
export default ArticleContainer;
