import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Routess from './routes/routes';

function App() {
  return (
    <Router>
      <Navbar />
      <Routess />
    </Router>
  );
}

export default App;
