import React from "react";
import { ACCESS_TOKEN, ID_TOKEN, EXPIRES_AT } from "../services/auth";

export default class MiscInfoPage extends React.Component {
  render() {
    return (
      <div>
        <h3>Misc info page</h3>

        <div>
          <h4>Access Token:</h4>
          <pre className="full-width">
            {localStorage.getItem(ACCESS_TOKEN) || "none"}
          </pre>
        </div>

        <div>
          <h4>ID Token:</h4>
          <pre className="full-width">
            {localStorage.getItem(ID_TOKEN) || "none"}
          </pre>
        </div>

        <div>
          <h4>Expires At:</h4>
          <pre className="full-width">
            {localStorage.getItem(EXPIRES_AT) || "none"}
          </pre>
        </div>
      </div>
    );
  }
}
