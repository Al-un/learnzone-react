import React from "react";
import ToLoginComponent from "./ToLoginComponent";
import { SAVED_URL } from ".";
import history from "../../routes/history";
import auth from "./";

const secured = (props, SecuredComponent, optionalProps) => {
  // Trigger login
  if (!auth.isAuthenticated()) {
    let requestedUrl = history.location.pathname
      .concat(history.location.hash)
      .concat(history.location.search);
    console.log(`[Authentication] saving URL for login: ${requestedUrl}`);
    localStorage.setItem(SAVED_URL, requestedUrl);
    auth.login();
    return <ToLoginComponent />;
  }
  // return the component
  else {
    let mergedProps = Object.assign({}, props, optionalProps);
    return <SecuredComponent {...mergedProps} />;
  }
};

export default secured;
