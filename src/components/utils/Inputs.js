import React from "react";
import PropTypes from "prop-types";

const IdHiddenInput = props => {
  return props.id ? <input type="hidden" name="id" value={props.id} /> : "";
};

IdHiddenInput.propsType = {
  id: PropTypes.number
};

export { IdHiddenInput };
