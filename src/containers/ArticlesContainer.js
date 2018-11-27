import React from "react";
import { Link } from "react-router-dom";
import ArticleList from "../components/ArticleList";

export default class ArticlesContainer extends React.Component {
  dummyData() {
    return [
      {
        id: 1,
        name: "Name",
        description: "Description",
        createdAt: "xxx",
        updatedAt: "xxx",
        user_id: 1
      },
      {
        id: 2,
        name: "Name",
        description: "Description",
        createdAt: "xxx",
        updatedAt: "xxx",
        user_id: 1
      },
      {
        id: 3,
        name: "Name",
        description: "Description",
        createdAt: "xxx",
        updatedAt: "xxx",
        user_id: 1
      },
      {
        id: 4,
        name: "Name",
        description: "Description",
        createdAt: "xxx",
        updatedAt: "xxx",
        user_id: 1
      }
    ];
  }

  render() {
    return (
      <div>
        <h3>Article</h3>
        <ArticleList articles={this.dummyData()} />
        <Link to="/articles/new" className="btn btn-outline-primary mt-3">
          Add a new article
        </Link>
      </div>
    );
  }
}
