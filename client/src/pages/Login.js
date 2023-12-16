import React, { useState } from 'react';
import '../styles/login.css';

const Login = () => {
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

      if (!response.ok) {
        console.log(response)
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();     

      if (result.success) {
        console.log('Login successful:', result.message);
        localStorage.setItem('token', result.token);
        window.location.href = '/tasks';
      } else {
        console.error('Login failed:', result.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="content">
      <h1 className="title">Login to Pomodoro Study</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          required
          onChange={handleChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={handleChange}
        />

        <button type="submit" className="cta-link">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
