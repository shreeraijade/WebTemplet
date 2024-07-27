import React from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'

function SignUp() {
   
    const { signin } = useContext(AuthContext);
    const navigate = useNavigate();

  const handleSignin = () => {
    // Simulate login and fetch tokens and user data
    const user = { name: 'John Doe',
        email: "shreyas.raijade@gmail.com",
        password: "1234"
     };

    signin(user);
    navigate('/home');
  };


  return (
    <div className='signup-body'>
        <div class="signup-container">
  <h2 class="signup-title">Sign Up</h2>
  <p class="signup-subtitle">Already have an account? <a href="#">Sign In</a></p>
  <form class="signup-form">
    <div class="input-group">
      <label for="first-name">Username *</label>
      <input type="text" id="first-name" name="first-name" required />
    </div>
    <div class="input-group">
      <label for="email">Email *</label>
      <input type="email" id="email" name="email" required />
    </div>
    <div class="input-group">
      <label for="password">Password *</label>
      <input type="password" id="password" name="password" required />
    </div>
    <button type="submit" class="signup-button" onClick={handleSignin}>Sign Up</button>
  </form>
</div>

      
    </div>
  )
}

export default SignUp
