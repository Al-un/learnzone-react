import { call, put, takeEvery } from "redux-saga/effects";

import { LOADED, DELETED, LOAD, DELETE } from "./article";

import { api_delete, api_get_json } from "../../api";
import Log from "../../services/log";

const ENTITY_API_ROOT_PATH = "/articles/";

function* loadArticles() {
  Log.debug("Loading articles", { tags: ["Saga", "Article"] });
  const articles = yield call(api_get_json, ENTITY_API_ROOT_PATH);
  Log.info(`Loaded ${articles.length} article(s)`, {
    tags: ["Saga", "Article"]
  });
  yield put({ type: LOADED, payload: articles });
}

function* deleteArticle(action) {
  const id = action.payload;
  Log.info(`Deleting article#${id}`, { tags: ["Saga", "Article"] });
  yield call(api_delete, `${ENTITY_API_ROOT_PATH}${id}`);
  yield put({ type: DELETED, payload: id });
}

export default function* watchArticles() {
  yield takeEvery(LOAD, loadArticles);
  yield takeEvery(DELETE, deleteArticle);
}
