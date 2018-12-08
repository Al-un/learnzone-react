import Log from "../services/log";

/**
 * Logging all Redux transactions
 * @param {*} store
 */
const logger = store => next => action => {
  Log.info("Dispatching", action, { tags: "Redux" });
  const result = next(action);
  Log.debug("Next state", store.getState(), { tags: "Redux" });
  return result;
};

/**
 * TODO: handling errors
 * @param {*} store
 */
const crachReporter = store => next => action => {
  try {
    return next(action);
  } catch (err) {
    Log.error("Exception", err, { tags: "Redux" });
  }
};

export { logger, crachReporter };
