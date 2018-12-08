import { createStore, combineReducers, applyMiddleware } from "redux";
import reducers from "./reducers";
import { logger, crachReporter } from "./middleware";
import createSagaMiddleware from "redux-saga";
import mySagas from "./sagas";

const rootReducers = combineReducers(reducers);
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducers,
  applyMiddleware(sagaMiddleware, logger, crachReporter)
);

sagaMiddleware.run(mySagas);

export default store;
