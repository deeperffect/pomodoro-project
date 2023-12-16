import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';  


const Home = () => {
  return(
    
    <div className="content">
      <h1 className="title">Welcome to Pomodoro Study</h1>
      <p className="description">
        Boost your productivity with the Pomodoro Technique. Break your work into focused intervals, traditionally 25 minutes in length, separated by short breaks. This proven technique enhances mental agility and helps you stay focused on your tasks.
      </p>
      <p className="cta">
        <Link to="/users/register" className="cta-link">Get Started</Link>
      </p>
    </div>
  
);
};

export default Home;
