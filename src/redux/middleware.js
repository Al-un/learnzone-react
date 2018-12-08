/**
 * Logging all Redux transactions
 * @param {*} store
 */
const logger = store => next => action => {
  console.log("[Redux] Dispatching", action);
  const result = next(action);
  console.log("[Redux] Next state", store.getState());
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
    console.error("[Redux] Exception", err);
  }
};

export { logger, crachReporter };
