import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  const isAuthenticated = () => {
    return localStorage.getItem('token') ? true : false;
  };


  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="home-container">
      <nav>
        <Link to="/" className="logo-link">
          <div className="logo"></div>
        </Link>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/timer">Timer</Link></li>
          {isAuthenticated() ? (
            <>
              <li><Link to="/tasks">Tasks</Link></li>
              <li><Link to="/study-projects">Study Projects</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/users/login">Login</Link></li>
              <li><Link to="/users/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
