import React, { useContext } from "react";

function Button({ title, variant, theme: _, ...rest }) {
  return (
    <button {...rest}>
      {title.toString()}
    </button>
  );
}

export default Button;

