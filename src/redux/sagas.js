import catalogsSagas from "./products/catalog.sagas";
import articlesSagas from "./products/article.sagas";
import { all } from "redux-saga/effects";
import Log from "../services/log";

/**
 * Loading flag
 */
function* onStart() {
  yield Log.info("Starting", { tags: "Saga" });
}

/**
 * Saga root
 */
export default function* mySaga() {
  yield all([onStart(), catalogsSagas(), articlesSagas()]);
}
