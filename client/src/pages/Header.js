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
      <div className="header-inner">
        <Link to="/" className="logo">
          <img src="/images/logo.png" alt="logo"/>
        </Link>

        <div className="header-content">
          <nav className="nav">
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

          <aside>
            {!isAuthenticated ? (
              <>
                <Link to="/users/login" className="button">Login</Link>

                <Link to="/users/register" className="button">Register</Link>
              </>
              ) : (
                <button onClick={handleLogout} className="button">Logout</button>
                )
              }
          </aside>
        </div>
      </div>
    </header>
  );
  }
export default Header;
