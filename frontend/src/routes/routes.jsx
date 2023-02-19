import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";

function AppRoutes() {
  const token = localStorage.getItem('token');

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {!token && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
}

export default AppRoutes;
