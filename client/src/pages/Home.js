import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/home.css'; 
import Stopwatch from '../components/Stopwatch'; 


const Home = () => {
  const [sliderValue, setSliderValue] = useState('');

  const handleSliderChange = (e) => {
    setSliderValue(parseInt(e.target.value, 10));
  };

  return(
    
    <div className="content">
      <h1 className="title">Welcome to Pomodoro Cat</h1>
      <div>
        <h1>Timer Page</h1>
        <label>
          Set Time (minutes):
          <input
            type="range"
            min="1"
            max="60"
            value={sliderValue}
            onChange={handleSliderChange}
          />
          {sliderValue} min
        </label>
        <Stopwatch initialTime={sliderValue} />
      </div>
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
