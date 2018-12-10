import Log from "../services/log";

/**
 * Logging all Redux transactions
 * @param {*} store
 */
const logger = store => next => action => {
  Log.info(`Dispatching ${action.type}`, "Redux");
  const result = next(action);
  // Commenting because:
  /**
   * Error: You may not call store.getState() while the reducer is executing.
   * The reducer has already received the state as an argument. Pass it down
   * from the top reducer instead of reading it from the store.
   */
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
    Log.error(`Exception ${JSON.stringify(action)}: ${err}`, err, "Redux");
    // console.error(`Redux Exception ${JSON.stringify(action)}`, err);
  }
};

export { logger, crachReporter };
