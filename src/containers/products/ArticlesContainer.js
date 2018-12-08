import { ArticleList } from "../../components/products/Article";
import entitiesHandler from "../hoc/entitiesHandler";
import { loadArticles, deleteArticle } from "../../redux/products/article";
import { connect } from "react-redux";

const mapStateToProps = state => ({ entities: state.articles.list });

const mapDispatchToProps = dispatch => {
  return {
    load: () => dispatch(loadArticles(dispatch)),
    delete: id => dispatch(deleteArticle(id))
  };
};

const ArticlesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(entitiesHandler(ArticleList));

export default ArticlesContainer;
