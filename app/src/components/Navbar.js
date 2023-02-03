import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      Navbar
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
