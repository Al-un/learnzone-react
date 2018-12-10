/**
 * Extract the post processing function from the meta parameter only if post
 * processing is a function
 * @param {*} action
 */
export function extractPostProcessing(action) {
  if (!action.meta) {
    return null;
  }
  // Post processing
  const postProcessing = action.meta.postProcessing;
  return postProcessing instanceof Function ? postProcessing : null;
}
