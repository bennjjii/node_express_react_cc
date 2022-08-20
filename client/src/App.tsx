import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import List from "./List";
import Detail from "./Detail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<List />} />
        <Route path="/users/:id" element={<Detail />} />
        <Route index element={<Navigate replace to="/users" />} />
        <Route path="*" element={<Navigate replace to="/users" />} />
      </Routes>
    </Router>
    // <List/>
  );
}

export default App;
