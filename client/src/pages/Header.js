import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';
import useAuthenticated from '../hooks/useAuthenticated';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import { useContext } from 'react';

const Header = () => {
  const isAuthenticated = useAuthenticated();
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <header className="header">
      <nav>
        <Link to="/" className="logo-link">
          <div className="logo"></div>
        </Link>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/timer">Timer</Link></li>
          <li><Link to="/public-tasks">Public Tasks</Link></li>
          {isAuthenticated && (
            <>
              <li><Link to="/tasks">Tasks</Link></li>
              <li><Link to="/study-projects">Study Projects</Link></li>
            </>
          )}
        </ul>
      </nav>
          <Link to="/users/login">Login</Link>
          <Link to="/users/register">Register</Link>
          <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
