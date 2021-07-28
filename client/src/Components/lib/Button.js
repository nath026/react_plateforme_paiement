import React, { useContext } from "react";

function Button({ title, ...rest }) {

  return (
    <button {...rest}>
      {title.toString()}
    </button>
  );
}

export default Button;