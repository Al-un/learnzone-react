import catalogsSagas from "./products/catalog.sagas";
import articlesSagas from "./products/article.sagas";
import { all } from "redux-saga/effects";

/**
 * Loading flag
 */
function* onStart() {
  while (true) {
    yield console.log("[Saga] Running Sagas");
  }
}

/**
 * Saga root
 */
export default function* mySaga() {
  yield all([onStart(), catalogsSagas(), articlesSagas()]);
}
