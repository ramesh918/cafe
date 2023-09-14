// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Cafe from './components/cafe/Cafe';
import Employee from './components/employee/Employee';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Cafe />} />
          <Route path="/employees/:cafeId" element={<Employee />} />
          <Route path="/employees" element={<Employee />} />
          {/* Define a route for employees with a dynamic parameter "cafeId" */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;



