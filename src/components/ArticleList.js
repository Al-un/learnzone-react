import React from "react";
import { Link } from "react-router-dom";

export default class ArticleList extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          {this.props.articles.map((article, index) => (
            <div key={article.id} className="col">
              <Link to={`/articles/${article.id}`}>
                <div className="card">
                  <div className="card-header">
                    <span>{article.name}</span>
                  </div>
                  <div className="card-body">
                    <p>{article.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
