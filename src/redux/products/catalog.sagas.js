import {
  LOADED,
  DELETED,
  LOAD,
  DELETE
} from "./catalog";
import { call, put, takeEvery } from "redux-saga/effects";
import { api_get, api_delete } from "../../api";

const ENTITY_API_ROOT_PATH = "/catalogs/";

function get(url) {
  return api_get(url).then(resp => resp.json());
}

function* loadCatalogs() {
  console.debug("[Saga] Loading catalogs");
  const catalogs = yield call(get, ENTITY_API_ROOT_PATH);
  console.log(`[Saga] Loaded ${catalogs.length} catalog(s)`);
  yield put({ type: LOADED, payload: catalogs });
}

function* deleteCatalog(action) {
  const id = action.payload;
  console.debug(`[Saga] Deleting catalog#${id}`);
  yield call(api_delete, `${ENTITY_API_ROOT_PATH}${id}`);
  yield put({ type: DELETED, payload: id });
}

export default function* watchCatalogs() {
  yield takeEvery(LOAD, loadCatalogs);
  yield takeEvery(DELETE, deleteCatalog);
}
