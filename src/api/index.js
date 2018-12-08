import { ACCESS_TOKEN } from "../services/auth";

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
 * Submitting a GET request
 * @param {*} url
 */
export async function api_get(url) {
  console.log(`Starting GET request to ${API}${url}`);

  return fetch(`${API}${url}`, {
    headers: HEADERS
  }).then(logResponse(url, "GET"));
}

/**
 * Submitting a POST request
 * @param {*} url
 * @param {*} body
 */
export function api_post(url, body) {
  console.log(
    `Starting POST request to ${API}${url} with body ${JSON.stringify(body)}`
  );

  return fetch(`${API}${url}`, {
    headers: HEADERS,
    method: "POST",
    body: JSON.stringify(body)
  }).then(logResponse(url, "POST"));
}

/**
 * Submitting a PATCH request
 * @param {*} url
 * @param {*} body
 */
export function api_patch(url, body) {
  console.log(
    `Starting PATCH request to ${API}${url} with body ${JSON.stringify(body)}`
  );

  return fetch(`${API}${url}`, {
    headers: HEADERS,
    method: "PATCH",
    body: JSON.stringify(body)
  }).then(logResponse(url, "PATCH"));
}

export function api_put(url, body) {
  console.log(
    `Starting PUT request to ${API}${url} with body ${JSON.stringify(body)}`
  );

  return fetch(`${API}${url}`, {
    headers: HEADERS,
    method: "PUT",
    body: JSON.stringify(body)
  }).then(logResponse(url, "PUT"));
}

export function api_delete(url, body) {
  console.log(
    `Starting DELETE request to ${API}${url} with body ${JSON.stringify(body)}`
  );

  return fetch(`${API}${url}`, {
    headers: HEADERS,
    method: "DELETE",
    body: JSON.stringify(body)
  }).then(logResponse(url, "DELETE"));
}

// -----------------------------------------------------------------------------

/**
 * Logging incoming response
 * @param {*} url requested URL
 * @param {*} method request method
 * @param {*} response request response
 */
function logResponse(url, method) {
  return response => {
    console.log(`Receive ${method} response from ${url}: ${JSON.stringify(response)}`);
    // console.log(response);
    return response;
  };
}
