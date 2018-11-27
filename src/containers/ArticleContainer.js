import Article from "../components/Article";
import entityHandlerHoc from "./utils/entityHandlerHoc";

const newEntity = () => ({
  name: ""
});

const loadEntity = () => ({
  id: 1,
  name: "Name",
  description: "Description",
  createdAt: "xxx",
  updatedAt: "xxx",
  user_id: 1
});

const ArticleContainer = entityHandlerHoc(Article, newEntity, loadEntity);

export default ArticleContainer;
