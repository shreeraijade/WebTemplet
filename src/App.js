import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import Navbar from './components/navbar';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Footer from './components/footer';
import SignUp from './pages/SignUp';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path='/signUp' element={<SignUp/>}/>
          <Route path="/dashboard" element={
            <AuthContext.Consumer>
              {({ isLoggedIn }) => isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
            </AuthContext.Consumer>
          } />
          <Route path="/profile" element={
            <AuthContext.Consumer>
              {({ isLoggedIn }) => isLoggedIn ? <Profile /> : <Navigate to="/login" />}
            </AuthContext.Consumer>
          } />
          <Route path="/settings" element={
            <AuthContext.Consumer>
              {({ isLoggedIn }) => isLoggedIn ? <Settings /> : <Navigate to="/login" />}
            </AuthContext.Consumer>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer/>
      </Router>
    </AuthProvider>
  );
};

export default App;
