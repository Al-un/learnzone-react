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
} from "./catalog";

import API from "../../api";
import Log from "../../services/log";
import {
  CATALOG_API_PATH
} from "../../components/products/Catalog";
import { extractPostProcessing } from "../utils/sagas";

/**
 * Loading catalogs list
 */
function* loadCatalogs() {
  Log.debug("Loading catalogs", { tags: ["Saga", "Catalog"] });
  const catalogs = yield call(API.get, CATALOG_API_PATH);
  yield put({ type: LIST_LOADED, payload: catalogs });
}

/**
 * Load a single catalog
 * @param {*} action
 */
function* loadCatalog(action) {
  const id = action.payload;
  Log.debug(`Loading #${id}`, { tags: ["Saga", "Catalog"] });
  const catalog = yield call(API.get, `${CATALOG_API_PATH}/${id}`);
  yield put({ type: LOADED, payload: catalog });
}

/**
 * Creating a new catalog
 * @param {*} action
 */
function* createCatalog(action) {
  Log.debug(`Creating`, action.payload, { tags: ["Saga", "Catalog"] });
  const catalog = yield call(API.post, `${CATALOG_API_PATH}`, action.payload);
  Log.debug(`Created`, catalog, { tags: ["Saga", "Catalog"] });
  yield put({ type: CREATED, payload: catalog, meta: action.meta });
  
  const postProcessing = extractPostProcessing(action);
  if (postProcessing) {
    yield call(postProcessing, catalog);
  }
}

/**
 * Update a catalog
 * @param {*} action
 */
function* updateCatalog(action) {
  Log.debug(`Updating`, action.payload, { tags: ["Saga", "Catalog"] });
  const id = action.payload.id;
  const catalog = yield call(
    API.patch,
    `${CATALOG_API_PATH}/${id}`,
    action.payload
  );
  yield put({ type: UPDATED, payload: catalog, meta: action.meta });
  
  const postProcessing = extractPostProcessing(action);
  if (postProcessing) {
    yield call(postProcessing, catalog);
  }
}

/**
 * Delete a catalog
 * @param {*} action
 */
function* deleteCatalog(action) {
  const id = action.payload;
  Log.info(`Deleting catalog#${id}`, { tags: ["Saga", "Catalog"] });
  yield call(API.delete, `${CATALOG_API_PATH}/${id}`);
  yield put({ type: DELETED, payload: id, meta: action.meta });
  
  const postProcessing = extractPostProcessing(action);
  if (postProcessing) {
    yield call(postProcessing);
  }
}

/**
 * Catalog actions
 */
export default function* watchCatalogs() {
  yield takeEvery(LIST_LOAD, loadCatalogs);
  yield takeEvery(LOAD, loadCatalog);
  yield takeEvery(CREATE, createCatalog);
  yield takeEvery(UPDATE, updateCatalog);
  yield takeEvery(DELETE, deleteCatalog);
}
