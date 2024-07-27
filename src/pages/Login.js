import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './Login.css'

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate login and fetch tokens and user data
    const accessToken = 'fakeAccessToken';
    const refreshToken = 'fakeRefreshToken';
    const user = { name: 'John Doe' };

    login(accessToken, refreshToken, user);
    navigate('/home');
  };

  return (
    <div className='login-body'>
      <div class="login-container">
  <h2 class="login-title">Sign In</h2>
  <p class="login-subtitle">Not a member yet? <a href="#">Sign Up here</a></p>
  <form class="login-form">
    <div class="input-group">
      <label for="email">Email *</label>
      <input type="email" id="email" name="email" required />
    </div>
    <div class="input-group">
      <label for="password">Password *</label>
      <input type="password" id="password" name="password" required />
    </div>
    <button type="submit" class="login-button" onClick={handleLogin}>Sign In</button>
    <p class="forgot-password"><a href="#">Forgot password?</a></p>
  </form>
</div>

    </div>
  );
};

export default Login;
