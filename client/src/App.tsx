import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import List from './List';
import Detail from './Detail';

function App() {
  return (
    <Router>
      {/* <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav> */}
      <Routes>
        <Route path="/users" element={<List />} />
        <Route path="/users/:id" element={<Detail/>}/>
        <Route index element={<Navigate replace to="/users" />} />
        <Route path="*" element={<Navigate replace to="/users" />} />
      </Routes>
    </Router>
    // <List/>
  );
}

export default App;
