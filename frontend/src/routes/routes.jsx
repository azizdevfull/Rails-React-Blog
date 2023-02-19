import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Posts from "../components/Posts"; // import the Posts component
import CreatePost from "../components/CreatePost";

function AppRoutes() {
  const token = localStorage.getItem('token');

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<Posts />} /> {/* add the Posts route */}
      <Route path="/create-post" element={<CreatePost />} />

      {!token && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Posts />} /> {/* add the Posts route */}
          <Route path="/*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
}

export default AppRoutes;
