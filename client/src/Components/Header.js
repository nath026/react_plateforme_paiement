import React, { useContext } from "react";
import { Link } from "react-router-dom";

function Header() {
  
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/account">Account</Link>
    </nav>
  );
}

export default Header;
