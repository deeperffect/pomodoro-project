import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  return (
    <div className="home-container">
      <nav>
        <Link to="/" className="logo-link">
          <div className="logo"></div>
        </Link>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/timer">Timer</Link></li>
          <li><Link to="/tasks">Your Tasks</Link></li>
          <li><Link to="/schedule">Your Schedule</Link></li>
          <li><Link to="/users/login">Login</Link></li>
          <li><Link to="/users/register">Sign up</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
