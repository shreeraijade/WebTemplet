import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import Navbar from './components/navbar';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Waste from './pages/waste';
import Login from './pages/Login';
import Footer from './components/footer';
import SignUp from './pages/SignUp';
import Stats from './pages/stats';
import NotificationPage from './pages/noti';
import VendorsList from './components/vendorList';
import RequestForm from './pages/requestform';
import Options from './components/options';
import Blog from './pages/blog';

const App = () => {
  let vendorArray = localStorage.getItem('vendorList')
  console.log(JSON.parse(vendorArray));
  const [vendorList, setVendorList] = useState(JSON.parse(vendorArray));

  // const { isLoggedIn } = useContext(AuthContext)
  return (
  

    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path='/signUp' element={<SignUp/>}/>
          <Route path="/leaderboard" element={
            <AuthContext.Consumer>
              {({ isLoggedIn }) => isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
            </AuthContext.Consumer>
          } />
          <Route path="/profile" element={
            <AuthContext.Consumer>
              {({ isLoggedIn }) => isLoggedIn ? <Profile /> : <Navigate to="/login" />}
            </AuthContext.Consumer>
          } />
          <Route path="/waste" element={
            <AuthContext.Consumer>
              {({ isLoggedIn }) => isLoggedIn ? <Waste vendorList={vendorList} setVendorList={setVendorList}/> : <Navigate to="/login" />}
            </AuthContext.Consumer>
          } />
          <Route path="/stats" element={
            <AuthContext.Consumer>
              {({ isLoggedIn }) => isLoggedIn ? <Stats /> : <Navigate to="/login" />}
            </AuthContext.Consumer>
          }  />

          <Route path="/Notifications" element={
            <AuthContext.Consumer>
              {({ isLoggedIn }) => isLoggedIn ? <NotificationPage /> : <Navigate to="/login" />}
            </AuthContext.Consumer>
          }  />

          <Route path="/waste/vendors/:wasteType" element={
            <AuthContext.Consumer>
              {({ isLoggedIn }) => isLoggedIn ? <VendorsList vendorList={vendorList} setVendorList={setVendorList}/> : <Navigate to="/login" />}
            </AuthContext.Consumer>
          }  />

          <Route path="/waste/vendors/request/:wasteTypeNo" element={
            <AuthContext.Consumer>
              {({ isLoggedIn }) => isLoggedIn ? <RequestForm /> : <Navigate to="/login" />}
            </AuthContext.Consumer>
          }  />

          <Route path="/blogs" element={
            <AuthContext.Consumer>
              {({ isLoggedIn }) => isLoggedIn ? <Blog /> : <Navigate to="/login" />}
            </AuthContext.Consumer>
          }  />

           <Route path="options" element={
            <AuthContext.Consumer>
              {({ isLoggedIn }) => isLoggedIn ? <Navigate to="/home" /> : <Options />}
            </AuthContext.Consumer>
          }  />



        </Routes>
        <Footer/>
      </Router>
    </AuthProvider>
  );
};

export default App;
