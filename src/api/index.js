const API = "http://localhost:8000";
const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5ESXdOell3T1RVM05VRXlPRU0zTlRFek16ZENNVEl4T1RNME9EUTBRalpHUXpjNE1ETXhPQSJ9.eyJpc3MiOiJodHRwczovL2FsLXVuLWRldi5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWJiYjlkNDI2MDE0NGQ3NmZlMmYxNWQ1IiwiYXVkIjpbImh0dHBzOi8vcmFpbHMubGVhcm56b25lLmNvbSIsImh0dHBzOi8vYWwtdW4tZGV2LmV1LmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE1NDMzNDI2NzYsImV4cCI6MTU0MzQyOTA3NiwiYXpwIjoiT2JRcVo4Y0E2cWUxN2g5MzZOSlc0QjZuZkZXallSaFUiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIn0.F80KqPptcyzZt5nrS8CIZC-y2Mzg6Kx44KxkkORwSWi4J8L_HKyLHRKGxzEQpRNDRDJ0fuNoNiHeTCDP4RhnvlbYhJjP5ODLwJ-WXaeA5Mb5UnCDLfP8k6zaZxaET52Q55D1bmO8If3-NI94V2rlpFzhu05ZYAskokEO0XW3yeVpIpv1eIV7_NKa9bdyKEFOq9t4UexDpvULxGFRkqK6lU6w-aJmnw41yFER57HG9GR1zOXxr1f2jLMqMrTVlW_comU63W0N0FikHfSfTmNjemH2pEwO-wH4vwM_tRmgNtTeKppeFGMWs9Cpq8b566DjhrqAORLF3sP4Ug-gz_6FqA"
};

/**
 * Submitting a GET request
 * @param {*} url
 */
export async function api_get(url) {
  console.log(`Starting GET request to ${API}${url}`);

  return fetch(`${API}${url}`, {
    headers: HEADERS
  }).then(response => {
    console.log(`Receive GET response from ${url}:`);
    console.log(response);
    return response;
  });
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
  }).then(logResponse(url, 'PATCH'));
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
    console.log(`Receive ${method} response from ${url}:`);
    console.log(response);
    return response;
  };
}
