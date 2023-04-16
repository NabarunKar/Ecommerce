import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCartContext } from "../contexts/CartContext";
// import { useCartContext } from "../contexts/CartContext";

function Navbar() {
  const { logout } = useLogout();

  const { user } = useAuthContext();

  const { total_item } = useCartContext();

  const handleClick = () => {
    logout();
  };

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
        <li>
          <Link to="/cart">Cart {total_item > 0 && <>({total_item})</>}</Link>
        </li>
        <li>
          {user && (
            <div>
              <ul>
                <li>{user.email}</li>
                <li>
                  <Link to={`/profile/${user._id}`}>Profile</Link>
                </li>
                <li>
                  <button onClick={handleClick}>Log out</button>
                </li>
              </ul>
            </div>
          )}
          {!user && (
            <div>
              <ul>
                <li>
                  <Link to="/login">Log In</Link>
                </li>
                <li>
                  <Link to="/create">Sign Up</Link>
                </li>
              </ul>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
