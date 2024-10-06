import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import CSS for styling

function HomePage() {
  return (
    <div className="homepage-container">
      {/* <h1>Welcome to the Home Page</h1> */}
      <nav className="nav-buttons">
        <Link to="/login" className="nav-button">Login</Link>
        <Link to="/register" className="nav-button">Register</Link>
      </nav>
    </div>
  );
}

export default HomePage;
