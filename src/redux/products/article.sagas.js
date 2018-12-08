import {
  LOADED,
  DELETED,
  LOAD,
  DELETE
} from "./article";
import { call, put, takeEvery } from "redux-saga/effects";
import { api_get, api_delete } from "../../api";

const ENTITY_API_ROOT_PATH = "/articles/";

function get(url) {
  return api_get(url).then(resp => resp.json());
}

function* loadArticles() {
  console.debug("[Saga] Loading articles");
  const articles = yield call(get, ENTITY_API_ROOT_PATH);
  console.log(`[Saga] Loaded ${articles.length} article(s)`);
  yield put({ type: LOADED, payload: articles });
}

function* deleteArticle(action) {
  const id = action.payload;
  console.debug(`[Saga] Deleting article#${id}`);
  yield call(api_delete, `${ENTITY_API_ROOT_PATH}${id}`);
  yield put({ type: DELETED, payload: id });
}

export default function* watchArticles() {
  yield takeEvery(LOAD, loadArticles);
  yield takeEvery(DELETE, deleteArticle);
}
