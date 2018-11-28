import Callback from "./Callback";
import SecuredRender from "./Secured";
import Auth from "./Auth";

/**
 * "Access token" key in local storage
 */
export const ACCESS_TOKEN = "access_token";
/**
 * "ID token" key in local storage
 */
export const ID_TOKEN = "id_token";
/**
 * "Expires at" key in local storage
 */
export const EXPIRES_AT = "expires_at";
/**
 * "Saved url" key in local storage. Saved URL is stored before redirection to
 * a protected route
 */
export const SAVED_URL = "saved_url";

/**
 * Re-export components, functions and stuff
 */
export { Callback, SecuredRender };

/**
 * Auth0 authentication handler
 */
const auth = new Auth();
export default auth;
