import { ACCESS_TOKEN } from "../services/auth";
import Log from "../services/log";

const API_URL =
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
const call_api = (method, url, body) => {
  // Hey!
  Log.debug(`${method} ${API_URL}${url} request`, body || {}, "API");

  // Options building, special case for GET
  const options = Object.assign(
    { headers: HEADERS },
    method !== "GET" ? { method: method } : null,
    body ? { body: JSON.stringify(body) } : null
  );
  Log.debug(`${method} ${API_URL}${url} options`, options, "API");

  // return promise
  return fetch(`${API_URL}${url}`, options)
    .then(resp => {
      Log.debug(`${method} ${API_URL}${url} response ${resp.status}`, "API");
      return resp;
    })
    .then(response => response.json())
    .catch(err => Log.error(`Error ${err}`, err, "API"));
  // .catch(err => console.error(`API Exception ${JSON.stringify(err)}`, err))
};

const API = {
  get: url => call_api("GET", url),
  post: (url, body) => call_api("POST", url, body),
  patch: (url, body) => call_api("PATCH", url, body),
  put: (url, body) => call_api("PUT", url, body),
  delete: (url, body) => call_api("DELETE", url, body)
};
export default API;
