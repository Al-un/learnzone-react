import React from "react";
import { ACCESS_TOKEN, ID_TOKEN, EXPIRES_AT } from "../services/auth";

/**
 * Hyperlink opened in _blank target:
 * https://github.com/asciidoctor/asciidoctor/issues/2071
 */
export default class MiscInfoPage extends React.Component {
  render() {
    const a_token = localStorage.getItem(ACCESS_TOKEN);
    const i_token = localStorage.getItem(ID_TOKEN);
    const ex_date = localStorage.getItem(EXPIRES_AT);

    return (
      <div>
        <h3>Misc info page</h3>

        <div>
          <h4>Access Token:</h4>
          <pre className="full-width">{a_token || "none"}</pre>
          {a_token && (
            <a
              href={`https://jwt.io/?token=${a_token}`}
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer">
              Decrypt on jwt.io
            </a>
          )}
        </div>

        <div>
          <h4>ID Token:</h4>
          <pre className="full-width">{i_token || "none"}</pre>
          {i_token && (
            <a
              href={`https://jwt.io/?token=${i_token}`}
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer">
              Decrypt on jwt.io
            </a>
          )}
        </div>

        <div>
          <h4>Expires At:</h4>
          <pre className="full-width">{ex_date || "none"}</pre>
        </div>
      </div>
    );
  }
}
