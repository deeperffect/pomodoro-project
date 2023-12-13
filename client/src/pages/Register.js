import React, { useState } from 'react';
import '../styles/register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/users/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    localStorage.setItem('userToken', data.token);
  }
  
  return (
    <div className="content">
      <h1 className="title">Create an Account</h1>
      <form onSubmit={handleRegister}>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" required onChange={handleChange} />

        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" required onChange={handleChange} />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required onChange={handleChange} />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required onChange={handleChange} />

        <label htmlFor="repeatPassword">Confirm Password:</label>
        <input type="password" id="repeatPassword" name="repeatPassword" required onChange={handleChange} />

        <button type="submit" className="cta-link">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
