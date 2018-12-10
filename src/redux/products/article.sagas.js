import { call, put, takeEvery } from "redux-saga/effects";

import {
  LOAD,
  LOADED,
  LIST_LOAD,
  LIST_LOADED,
  CREATE,
  CREATED,
  UPDATE,
  UPDATED,
  DELETE,
  DELETED
} from "./article";

import API from "../../api";
import Log from "../../services/log";
import { ARTICLE_API_PATH } from "../../components/products/Article";
import { extractPostProcessing } from "../utils/sagas";

function* loadArticles() {
  Log.debug("Loading articles", { tags: ["Saga", "Article"] });
  const articles = yield call(API.get, ARTICLE_API_PATH);
  yield put({ type: LIST_LOADED, payload: articles });
}

function* loadArticle(action) {
  const id = action.payload;
  Log.debug(`Loading #${id}`, { tags: ["Saga", "Article"] });
  const articles = yield call(API.get, `${ARTICLE_API_PATH}/${id}`);
  yield put({ type: LOADED, payload: articles });
}

function* createArticle(action) {
  Log.debug(`Creating`, action.payload, { tags: ["Saga", "Article"] });
  const article = yield call(API.post, `${ARTICLE_API_PATH}`, action.payload);
  yield put({ type: CREATED, payload: article, meta: action.meta });

  const postProcessing = extractPostProcessing(action);
  if (postProcessing) {
    yield call(postProcessing, article);
  }
}

function* updateArticle(action) {
  Log.debug(`Updating`, action.payload, { tags: ["Saga", "Article"] });
  const id = action.payload.id;
  const article = yield call(
    API.patch,
    `${ARTICLE_API_PATH}/${id}`,
    action.payload
  );
  yield put({ type: UPDATED, payload: article, meta: action.meta });

  const postProcessing = extractPostProcessing(action);
  if (postProcessing) {
    yield call(postProcessing, article);
  }
}

function* deleteArticle(action) {
  const id = action.payload;
  Log.info(`Deleting article#${id}`, { tags: ["Saga", "Article"] });
  yield call(API.delete, `${ARTICLE_API_PATH}/${id}`);
  yield put({ type: DELETED, payload: id, meta: action.meta });
  
  const postProcessing = extractPostProcessing(action);
  if (postProcessing) {
    yield call(postProcessing);
  }
}

export default function* watchArticles() {
  yield takeEvery(LIST_LOAD, loadArticles);
  yield takeEvery(LOAD, loadArticle);
  yield takeEvery(CREATE, createArticle);
  yield takeEvery(UPDATE, updateArticle);
  yield takeEvery(DELETE, deleteArticle);
}
