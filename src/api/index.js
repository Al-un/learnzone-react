import { ACCESS_TOKEN } from "../services/auth";
import Log from "../services/log";

const API =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://learnzone-rails.herokuapp.com";
const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
};

/**
 * Uber API call method
 * @param {*} method call method
 * @param {*} url called URL
 * @param {*} body optional body to send. Object format is JSONised
 */
const api = (method, url, body) => {
  // Hey!
  Log.debug(
    `Starting ${method} request to ${API}${url} with ${JSON.stringify(body)}`,
    {
      tags: "API"
    }
  );

  // Options building, special case for GET
  const options = Object.assign(
    { headers: HEADERS },
    method !== "GET" ? { method: method } : null,
    body ? { body: JSON.stringify(body) } : null
  );

  // return promise
  return fetch(`${API}${url}`, options).then(response => {
    Log.debug(
      `Receive ${method} response from ${url}: ${JSON.stringify(response)}`,
      {
        tags: "API"
      }
    );
    return response;
  });
};

/**
 * Submitting a GET request
 * @param {*} url
 */
export function api_get(url) {
  return api("GET", url, null);
}

export function api_get_json(url) {
  return api("GET", url, null).then(response => response.json());
}

/**
 * Submitting a POST request
 * @param {*} url
 * @param {*} body
 */
export function api_post(url, body) {
  return api("POST", url, body);
}

/**
 * Submitting a PATCH request
 * @param {*} url
 * @param {*} body
 */
export function api_patch(url, body) {
  return api("PATCH", url, body);
}

/**
 * Submitting a PUT request
 * @param {*} url
 * @param {*} body
 */
export function api_put(url, body) {
  return api("PUT", url, body);
}

/**
 * Submitting a DELETE request
 * @param {*} url
 * @param {*} body
 */
export function api_delete(url, body) {
  return api("DELETE", url, body);
}
