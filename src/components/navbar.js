import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isLoggedIn, logout, user, setUser } = useContext(AuthContext);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false); // State to manage navbar toggle

  const toggleNavbar = () => {
    setIsNavbarOpen((prev) => !prev); // Toggle the navbar state
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">WasteWell</Link>
      </div>
      <button className="navbar-toggle" onClick={toggleNavbar}>
        {isNavbarOpen ? 'Close' : 'Menu'}
      </button>
      <ul className={`navbar-links ${isNavbarOpen ? 'active' : ''}`}>
        <li>
          <NavLink exact to="/" activeClassName="active" onClick={toggleNavbar}>
            Home
          </NavLink>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <NavLink to="/waste" activeClassName="active" onClick={toggleNavbar}>
                Waste
              </NavLink>
            </li>
            <li>
              <NavLink to="/Notifications" activeClassName="active" onClick={toggleNavbar}>
                Notifications
              </NavLink>
            </li>
            <li>
              <NavLink to="/blogs" activeClassName="active" onClick={toggleNavbar}>
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink to="/stats" activeClassName="active" onClick={toggleNavbar}>
                Statistics
              </NavLink>
            </li>
            {
              (user.type=== 'Seller') ?  (<li>
              <NavLink to="/leaderBoard" activeClassName="active" onClick={toggleNavbar}>
                LeaderBoard
              </NavLink>
            </li>) : <></>
            }
            <li>
              <NavLink to="/profile" activeClassName="active" onClick={toggleNavbar}>
                Profile
              </NavLink>
            </li>
          </>
        ) : (
          <ul className="guest-links">
            <li>
              <NavLink
                to="/options"
                activeClassName="active"
                className="guest-buttons"
                onClick={() => {
                  setUser({ ...user, button: 'in' });
                  toggleNavbar();
                }}
              >
                SignIn
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/options"
                activeClassName="active"
                className="guest-buttons"
                onClick={() => {
                  setUser({ ...user, button: 'up' });
                  toggleNavbar();
                }}
              >
                SignUp
              </NavLink>
            </li>
          </ul>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
