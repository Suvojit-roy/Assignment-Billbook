import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Formpage from "./Components/Formpage";
import Home from "./Components/Home";

const RouterReact = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Formpage />} />
      </Routes>
    </Router>
  );
};

export default RouterReact;
