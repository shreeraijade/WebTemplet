import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isLoggedIn, logout, user, setUser } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">WasteWelll</Link>
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
              <NavLink to="/waste" activeClassName="active">
                Waste
              </NavLink>
            </li>
            <li>
              <NavLink to="/Notifications" activeClassName="active">
                Notifications
              </NavLink>
            </li>
            <li>
              <NavLink to="/stats" activeClassName="active">
                Statistics
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" activeClassName="active">
                Profile
              </NavLink>
            </li>
          </>
        ) : (
          <ul className='navbar-links guest-links'>
          <li>
            <NavLink to="/options" activeClassName="active" className="guest-buttons" onClick={()=>{
              setUser({...user, button: "in"})
            }}>
              SignIn
            </NavLink>
          </li>
          <li>
            <NavLink to="/options" activeClassName="active" className="guest-buttons" onClick={()=>{
              setUser({...user, button: "up"})
            }}>
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
