// -------------------- Import
// React
import { connect } from "react-redux";
// HOC
import entitiesHandler from "../hoc/entitiesHandler";
// Products
import ArticleList from "../../components/products/ArticleList";
import { loadArticles, deleteArticle } from "../../redux/products/article";

// -------------------- Redux def
const mapStateToProps = state => ({ entities: state.articles.list });

const mapDispatchToProps = dispatch => {
  return {
    load: () => dispatch(loadArticles()),
    delete: id => dispatch(deleteArticle(id))
  };
};

const ArticlesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(entitiesHandler(ArticleList));

// -------------------- Export
export default ArticlesContainer;
