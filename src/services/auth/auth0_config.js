export const AUTH0_CONFIG =
  process.env.NODE_ENV === "development"
    ? {
        domain: "al-un-dev.eu.auth0.com",
        clientID: "LcFOtvd8rXXxeC9XFnAYD3Ysypq2tpRE",
        redirectUri: "http://localhost:3000/callback",
        logoutUrl: "http://localhost:3000"
      }
    : {
        domain: "al-un.eu.auth0.com",
        clientID: "",
        redirectUri: "https://al-un.github.io/learnzone-react/callback",
        logoutUrl: "https://al-un.github.io/learnzone-react/"
      };
