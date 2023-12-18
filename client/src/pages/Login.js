import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import { useContext } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUserToken }= useContext(UserContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();     

      if (data.success) {
        console.log('Login successful:', data.message);
        localStorage.setItem('token', data.token);
        setCurrentUserToken(data.token);
        navigate('/tasks');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="form">
      <h1 className="title">Login to Pomodoro Study</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="email">Email:</label>

          <input
            type="text"
            id="email"
            name="email"
            required
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="password">Password:</label>

          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={handleChange}
            />
        </div>

        <button type="submit" className="cta-link">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
