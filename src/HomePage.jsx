// src/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // Import your CSS

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="navbar">
        <div className="website-name">Heaven Edu</div> {/* Website Name on the left */}
        <nav className="nav-links"> {/* Navigation Links on the right */}
          <Link to="/">Home</Link>
          {/* <Link to="/">Search</Link> */}
          {/* <Link to="/">Favourites</Link> */}
          <Link to="/login">Login</Link>
        </nav>
      </div>
      <div className="content">
        <h1>Healing through the words</h1>
        <p className="con">
          Your gateway to a world of knowledge. Explore our vast collection of
          books, journals, and resources tailored for your reading pleasure.
          Whether you’re looking for academic resources or leisurely reads, we
          have it all!
        </p>
      </div>
    </div>
  );
};

export default HomePage;
