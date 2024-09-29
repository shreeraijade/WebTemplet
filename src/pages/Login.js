import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './Login.css'

const Login = () => {
  const { login, user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async(e) => {
    // Simulate login and fetch tokens and user data
    e.preventDefault();
    const newUser = {
      ...user,
      email,
      password
    }

    setUser(newUser);
    const purva = await login(newUser);

    if(purva){
      navigate('/');
    } else{
      alert("Faild to login!")
    }
    
  };





  

  return (
    <div className='login-body'>
      <div class="login-container">
  <h2 class="login-title">Sign In</h2>
  <p class="login-subtitle">Not a member yet? <a href="#">Sign Up here</a></p>
  <form class="login-form" onSubmit={handleLogin}>
    <div class="input-group">
      <label for="email">Email *</label>
      <input type="email" id="email" name="email" value={email} onChange={(e)=>{ setEmail(e.target.value)}} required />
    </div>
    <div class="input-group">
      <label for="password">Password *</label>
      <input type="password" id="password" name="password" value={password} onChange={(e)=>{ setPassword(e.target.value)}} required />
    </div>
    <button type="submit" class="login-button">Sign In</button>
    <p class="forgot-password"><a href="#">Forgot password?</a></p>
  </form>
</div>

    </div>
  );
};

export default Login;
