import auth0 from "auth0-js";
import history from "../../routes/history";
import { AUTH0_CONFIG } from "./auth0_config";
import { ACCESS_TOKEN, ID_TOKEN, EXPIRES_AT, SAVED_URL } from "./";
import { ROOT_PATH } from "../../routes";
import Log from "../log";

/**
 * Auth0 authentication handler
 */
export default class Auth {
  /**
   * Auth0 configuration
   */
  auth0 = new auth0.WebAuth({
    domain: AUTH0_CONFIG.domain,
    clientID: AUTH0_CONFIG.clientID,
    redirectUri: AUTH0_CONFIG.redirectUri,
    responseType: "token id_token",
    scope: "openid",
    audience: AUTH0_CONFIG.audience
  });

  constructor() {
    Log.debug("Contructing Auth instance", { tags: "Auth" });
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  /**
   * Trigger redirection to login page
   */
  login() {
    let redirect_url = localStorage.getItem(SAVED_URL);
    if (redirect_url === undefined || redirect_url === null) {
      redirect_url = window.location.pathname;
      localStorage.setItem(SAVED_URL, redirect_url);
    }
    Log.info(` Auth0 login with saving: ${redirect_url}`, {
      tags: "Authentication"
    });
    this.auth0.authorize();
  }

  /**
   * Handle a successful authentication: token and stuff
   */
  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      // Any error
      if (err) {
        Log.error(`[Authentication] Error`, err, { tags: "Auth" });
        history.replace(ROOT_PATH);
      }

      // Successful authentication
      else if (authResult && authResult.accessToken && authResult.idToken) {
        // save tokens
        this.setSession(authResult);
        // redirection
        let redirectUrl = localStorage.getItem(SAVED_URL) || ROOT_PATH;
        Log.info(`[Authentication] success and redirect to ${redirectUrl}`, {
          tags: "Auth"
        });
        localStorage.removeItem(SAVED_URL);
        history.replace(redirectUrl);
      }

      // WTF?
      else {
        Log.error(`[Authentication] abnormal auth:`, authResult, {
          tags: "Auth"
        });
        history.replace(ROOT_PATH);
      }
    });
  }

  /**
   * Token and stuff from authentication handling
   * @param {*} authResult
   */
  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem(ACCESS_TOKEN, authResult.accessToken);
    localStorage.setItem(ID_TOKEN, authResult.idToken);
    localStorage.setItem(EXPIRES_AT, expiresAt);
  }

  /**
   * Logout process
   */
  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(ID_TOKEN);
    localStorage.removeItem(EXPIRES_AT);

    // fully logout from Auth0 as well:
    let logoutPath = `https://${AUTH0_CONFIG.domain}/v2/logout?client_id=${
      AUTH0_CONFIG.clientID
    }&returnTo=${AUTH0_CONFIG.logoutUrl}`;
    window.location.replace(logoutPath);
  }

  /**
   * Check if current session is an authenticated session:
   * - session is logged in
   * - AND current session is not an expired one
   */
  isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem(EXPIRES_AT));
    return new Date().getTime() < expiresAt;
  }
}
