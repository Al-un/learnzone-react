import { call, put, takeEvery } from "redux-saga/effects";

import { LOADED, DELETED, LOAD, DELETE } from "./catalog";

import { api_delete, api_get_json } from "../../api";
import Log from "../../services/log";

const ENTITY_API_ROOT_PATH = "/catalogs/";

function* loadCatalogs() {
  Log.debug("Loading catalogs", { tags: ["Saga", "Catalog"] });
  const catalogs = yield call(api_get_json, ENTITY_API_ROOT_PATH);
  Log.info(`Loaded ${catalogs.length} catalog(s)`, {
    tags: ["Saga", "Catalog"]
  });
  yield put({ type: LOADED, payload: catalogs });
}

function* deleteCatalog(action) {
  const id = action.payload;
  Log.info(`Deleting catalog#${id}`, { tags: ["Saga", "Catalog"] });
  yield call(api_delete, `${ENTITY_API_ROOT_PATH}${id}`);
  yield put({ type: DELETED, payload: id });
}

export default function* watchCatalogs() {
  yield takeEvery(LOAD, loadCatalogs);
  yield takeEvery(DELETE, deleteCatalog);
}
