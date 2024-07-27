import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Shreyas Raijade</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <NavLink to="/dashboard" activeClassName="active">
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" activeClassName="active">
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings" activeClassName="active">
                Settings
              </NavLink>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login" activeClassName="active">
              SignIn
            </NavLink>
            <NavLink to="/signUp" activeClassName="active">
              SignUp
            </NavLink>

          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
