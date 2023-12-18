import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../components/UserContext';


const Register = () => {
  const navigate = useNavigate();
  const { setCurrentUserToken } = useContext(UserContext);
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
    const errors = [];

    if (formData.password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    
    if (formData.repeatPassword.length < 8) {
      errors.push('Repeat Password must be at least 8 characters long');
    }
    
    if (formData.email.length < 4) {
      errors.push('Email must be at least 4 characters long');
    }
    
    if (formData.firstName.length < 2) {
      errors.push('First Name must be at least 2 characters long');
    }
    
    if (formData.lastName.length < 2) {
      errors.push('Last Name must be at least 2 characters long');
    }
    

    if(formData.password !== formData.repeatPassword) {
      errors.push('Passwords do not match');
    }

    if(errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }
    const response = await fetch('http://localhost:5000/users/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if(response.status === 409) {
      alert("Invalid email");
    }
    if(data.token) {
      localStorage.setItem('token', data.token);
      setCurrentUserToken(data.token);
      navigate('/tasks');
    }
  }
  
  return (
    <div className="form">
      <h1 className="title">Create an Account</h1>
      <form onSubmit={handleRegister}>
        <div className="form-row">
          <label htmlFor="firstName">First Name:</label>

          <input type="text" id="firstName" name="firstName" required onChange={handleChange} />
        </div>

        <div className="form-row">
          <label htmlFor="lastName">Last Name:</label>

          <input type="text" id="lastName" name="lastName" required onChange={handleChange} />
        </div>

        <div className="form-row">
          <label htmlFor="email">Email:</label>

          <input type="email" id="email" name="email" required onChange={handleChange} />
        </div>

        <div className="form-row">
          <label htmlFor="password">Password:</label>

          <input type="password" id="password" name="password" required onChange={handleChange} />
        </div>

        <div className="form-row">
          <label htmlFor="repeatPassword">Confirm Password:</label>

          <input type="password" id="repeatPassword" name="repeatPassword" required onChange={handleChange} />
        </div>

        <button type="submit" className="cta-link">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
