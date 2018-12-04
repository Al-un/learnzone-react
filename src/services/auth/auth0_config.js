const base_url =
  process.env.BASE_URL || "https://al-un.github.io/learnzone-react";

export const AUTH0_CONFIG =
  process.env.NODE_ENV === "development"
    ? {
        domain: "al-un-dev.eu.auth0.com",
        clientID: "LcFOtvd8rXXxeC9XFnAYD3Ysypq2tpRE",
        redirectUri: "http://localhost:3000/callback",
        logoutUrl: "http://localhost:3000",
        audience: "https://rails.learnzone.com"
        // audience: "https://node.learnzone.com"
      }
    : {
        domain: "al-un.eu.auth0.com",
        clientID: "",
        redirectUri: `${base_url}/callback`,
        logoutUrl: `${base_url}/`,
        audience: "https://rails.learnzone.com"
      };
