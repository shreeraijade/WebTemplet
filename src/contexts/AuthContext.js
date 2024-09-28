import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = Cookies.get("accesstoken");
    const refreshToken = Cookies.get("refreshtoken");

    if (accessToken && refreshToken) {
      // Fetch user data or validate tokens here if needed
      const myUser = localStorage.getItem("currentUser");
      console.log(myUser);
      
      setIsLoggedIn(true);
      setUser(JSON.parse(myUser)); // Make sure to parse the stored user data
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  },[]);

  const signup = async (User) => {
    console.log(User);
    let url = "";

    if (User.type === "Vendor") {
      url = `http://localhost:8000/api/v1/vendor/register`;
    } else {
      url = `http://localhost:8000/api/v1/seller/register`;
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(User), // Pass the `User` data instead of `user`
      credentials: "include", // Include cookies for CORS
    };

    try {
      const res = await fetch(url, options);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        
        setIsLoggedIn(true);
        setUser(User);
        localStorage.setItem("currentUser", JSON.stringify(User));

        return true; // Return true if signup is successful
      } else {
        console.log("Failed to sign up:", res.status);
        return false; // Return false if signup fails
      }
    } catch (err) {
      console.log("Error:", err);
      return false; // Return false if an error occurs
    }
  };

  const login = async(User) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(User),
      credentials: "include", 
    };
    console.log(User);
    let loginUrl = ""

    if(User.type === "Vendor"){
        loginUrl = "http://localhost:8000/api/v1/vendor/login"
    } else{
        loginUrl = "http://localhost:8000/api/v1/seller/login"
    }
   

    try {
      const res = await fetch(loginUrl,  options);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setIsLoggedIn(true);
        setUser(data.user);
        localStorage.setItem("currentUser", JSON.stringify(User));
        return true;
      } else{
        return false;
      }
    } catch (error) {
        console.log(error);
        return false;
    }
     
  };

  const logout = () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
     // Pass the `User` data instead of `user`
      credentials: "include", // Include cookies for CORS
    };

    let logoutUrl = "";
    if(user.type ==="Vandor"){
        logoutUrl = "http://localhost:8000/api/v1/vendor/logout"
    } else{
         logoutUrl = "http://localhost:8000/api/v1/seller/logout"
    }

    fetch(logoutUrl, options)
    .then((res)=>{
        if(res.status === 200){
          Cookies.remove("accesstoken");
          Cookies.remove("refreshtoken");
          setIsLoggedIn(false);
          setUser(null);
          localStorage.removeItem("currentUser");
          window.location.href = "/";
        }
    })
 
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, logout, signup, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
