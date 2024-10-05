import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import NotFound from './components/NotFound.js'; // Optional 404 component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} /> {/* Optional: catch-all for 404 */}
      </Routes>
    </Router>
  );
}

export default App;
