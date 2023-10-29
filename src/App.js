import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SearchSort from "./components/searchSort/SearchSort";
import WarehouseDetail from "./components/WarehouseDetails/WarehouseDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="main-container">
        <Routes>
          <Route path="/" element={<SearchSort />} />
          <Route path="/warehouse/:id" element={<WarehouseDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
