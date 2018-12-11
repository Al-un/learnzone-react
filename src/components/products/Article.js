import PropTypes from "prop-types";

/**
 * API root path
 */
const ARTICLE_API_PATH = "/articles";
/**
 * UI root path
 */
const ARTICLE_PATH = "/articles";
/**
 * Article definition
 */
const ARTICLE_ATTRIBUTES = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  user_id: PropTypes.number
};

const generateNewArticle = () => ({
  name: ""
});

export {
  ARTICLE_API_PATH,
  ARTICLE_PATH,
  ARTICLE_ATTRIBUTES,
  generateNewArticle
};
