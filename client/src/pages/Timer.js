import React, { useState } from 'react';
import Stopwatch from '../components/Stopwatch';

const Timer = () => {
  const [sliderValue, setSliderValue] = useState('');

  const handleSliderChange = (e) => {
    setSliderValue(parseInt(e.target.value, 10));
  };

  return (
    <div>
      <div className="page-name">
        <h1>Timer</h1>
      </div>
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
  );
};

export default Timer;
