import articles from "./products/article";
import catalogs from "./products/catalog";

// Re-export to centralise reducers
const reducers = { articles, catalogs };
export default reducers;
