import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const { signup, user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const handleSignUp = async(e) => {
    e.preventDefault(); // Prevent form submission

    // Prepare the new user object
    // console
    const newUser = {
      ...user,
      name,
      email,
      password,
      contact,
      address,
    };
    console.log(newUser)

    // Update the user state
    setUser(newUser);

    // Call signup function
    const purva = await signup(newUser);
    console.log(purva)

    // Navigate if signup is successful
    if (purva) {
      navigate('/');
    }
  };

  return (
    <div className='signup-body'>
      <div className="signup-container">
        <h2 className="signup-title">Sign Up</h2>
        <p className="signup-subtitle">
          Already have an account? <a href="#">Sign In</a>
        </p>
        <form className="signup-form" onSubmit={handleSignUp}>
          <div className="input-group">
            <label htmlFor="first-name">Username *</label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              value={name}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="phnumber">Number *</label>
            <input
              type="number"
              id="phnumber"
              name="phnumber"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="address">Address *</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
