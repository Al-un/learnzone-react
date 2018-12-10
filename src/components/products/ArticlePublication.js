import React from "react";
import PropTypes from "prop-types";
import auth from "../../services/auth";
import API from "../../api";
import { DeleteButton } from "../utils/Buttons";
import Log from "../../services/log";

/**
 * Listing article publications regardless from article or from catalog
 */
class ArticlePublications extends React.Component {
  render() {
    return (
      <div>
        <h3>Publications</h3>
        <ul id="article_publications" className="list-group">
          {this.props.list.map(publication => (
            <li
              key={publication.id}
              className="list-group-item d-flex justify-content-between align-items-center">
              <span>
                [{publication.id}] {publication.catalog.name} -{" "}
                {publication.article.name}
              </span>

              <span className="badge">
                {auth.isAuthenticated() && (
                  <DeleteButton
                    deleteFunc={() => this.props.handleDeletion(publication.id)}
                  />
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

/**
 * Search a product (article or catalog) to add to its counterpart (article for
 * catalog and catalog for article)
 * @param {*} props
 */
const SearchProductForm = props => (
  <div>
    <h3>Search {props.entityName} to add</h3>
    <div>
      <span>Search {props.entityName} </span>
      <input
        type="text"
        name="search_name"
        value={props.searchName}
        onChange={props.handleSearchNameChange}
      />
      <button type="button" className="btn btn-primary" onClick={props.search}>
        Search
      </button>
    </div>
  </div>
);

SearchProductForm.propTypes = {
  entityName: PropTypes.string.isRequired,
  searchName: PropTypes.string.isRequired,
  handleSearchNameChange: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired
};

/**
 * Display searched results with button to add as a publication
 * @param {*} props
 */
const SearchedProducts = props => (
  <ul className="list-group">
    {props.searchedList.map(entity => (
      <li
        key={entity.id}
        className="list-group-item d-flex justify-content-between align-items-center">
        <span>{entity.name}</span>
        <span className="badge">
          <button
            type="button"
            className="btn-sm"
            onClick={() => props.createPublication(entity.id)}>
            <span className="fas fa-plus" />
            <span>Add</span>
          </button>
        </span>
      </li>
    ))}
  </ul>
);

SearchedProducts.propTypes = {
  searchedList: PropTypes.array.isRequired,
  createPublication: PropTypes.func.isRequired
};

/**
 * Handle article publications:
 * - list
 * - search product to generate publication
 * - delete existing publications
 */
export default class ArticlePublicationsManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      publications: this.props.publications || [],
      searchName: "",
      searchResults: []
    };
  }

  /**
   * Creating a publication
   */
  createPublication = productId => {
    const publication = this.props.buildPublication(productId);

    Log.info(`Creating publication ${JSON.stringify(publication)}`, {
      tags: "ArticlePublication"
    });

    return API.post(`/article_publications/`, publication).then(data =>
      this.setState({ publications: this.state.publications.concat(data) })
    );
  };

  /**
   * Deleting a publication
   */
  deletePublication = id => {
    Log.info(`deleting publication#${id}`);

    API.delete(`/article_publications/${id}`).then(data => {
      Log.debug(
        `Deletion response: ${JSON.stringify(data)}`,
        "ArticlePublication"
      );
      if (data.success) {
        this.setState(prevState => ({
          publications: prevState.publications.filter(publ => publ.id !== id)
        }));
      }
    });
  };

  /**
   * Searching new name
   */
  handleSearchNameChange = event => {
    this.setState({ searchName: event.target.value });
  };

  /**
   * Search products
   */
  search = () => {
    const name = this.state.searchName;
    const searchUrl = this.props.searchUrl(name);
    API.get(searchUrl).then(data => this.setState({ searchResults: data }));
  };

  render() {
    return (
      <div>
        <ArticlePublications
          list={this.state.publications}
          handleDeletion={this.deletePublication}
        />

        <SearchProductForm
          entityName={this.props.entityName}
          searchName={this.state.searchName}
          handleSearchNameChange={this.handleSearchNameChange}
          search={this.search}
        />

        <SearchedProducts
          searchedList={this.state.searchResults}
          createPublication={productId => this.createPublication(productId)}
        />
      </div>
    );
  }
}

ArticlePublicationsManager.propTypes = {
  publications: PropTypes.array,
  searchUrl: PropTypes.func.isRequired,
  entityName: PropTypes.string.isRequired,
  buildPublication: PropTypes.func.isRequired
};
