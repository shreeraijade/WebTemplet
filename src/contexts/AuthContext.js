import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('accessToken'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');

    if (accessToken && refreshToken) {
      // Fetch user data or validate tokens here if needed
      setIsLoggedIn(true);
      setUser({ name: 'John Doe' }); // Replace with actual user data fetching
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  const signin=(user)=>{
    setIsLoggedIn(true);
    setUser(user)
  }

  const login = (accessToken, refreshToken, user) => {
    Cookies.set('accessToken', accessToken, { secure: true, sameSite: 'Strict' });
    Cookies.set('refreshToken', refreshToken, { secure: true, sameSite: 'Strict' });
    setIsLoggedIn(true);
    setUser(user);
  };

  const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, signin }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
