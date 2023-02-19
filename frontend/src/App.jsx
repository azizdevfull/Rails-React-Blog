import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Routess from './routes/routes';

function App() {
  return (
    <Router>
      <Routess />
    </Router>
  );
}

export default App;
