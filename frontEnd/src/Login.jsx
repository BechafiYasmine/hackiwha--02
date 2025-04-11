import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/login', values)
      .then(res => {
        if (res.data.role === "parent") {
          navigate('/parent');
        } else {
          navigate('/doctor');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Sign In</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              name="email" 
              placeholder="you@example.com"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Enter your password"
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              required 
            />
          </div>
          <button type="submit" className="submit-btn">Log In</button>
          <p className="terms">By logging in, you agree to our terms and policies.</p>
          <Link to="/register" className="register-link">Don't have an account? Create one</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
