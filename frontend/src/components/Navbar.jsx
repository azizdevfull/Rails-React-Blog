import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  let token = localStorage.getItem("token");

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        {token && (
          <li>
            <Link to="/create-post">Create Post</Link>
          </li>
        )}
        {!token && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
