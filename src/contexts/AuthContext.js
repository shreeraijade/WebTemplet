import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate, useResolvedPath } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("accesstoken"));
  let myUser = localStorage.getItem("currentUser");
 
  const [user, setUser] = useState(JSON.parse(myUser));
  
  


  const fetchData = async()=>{
    try {
      console.log("auth effect executing");
      const res = await fetch('http://localhost:8000/api/v1/vendor/getvendor',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        credentials: "include"
      })

      const data = await res.json();

      setUser({...data})
    
      
      setIsLoggedIn(true)
      console.log(isLoggedIn);

    } catch (error) {
         console.log(error)
    }
  }

  useEffect(() => {
    const accessToken = Cookies.get("accesstoken");
    const refreshToken = Cookies.get("refreshtoken");
    console.log(accessToken);
    if (accessToken && refreshToken) {
      // Fetch user data or validate tokens here if needed

      setIsLoggedIn(true);
      
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
        setUser(data);
        localStorage.setItem("currentUser", JSON.stringify(data));

        return true; 
      } else {
        console.log("Failed to sign up:", res.status);
        return false; 
      }
    } catch (err) {
      console.log("Error:", err);
      return false; 
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
        setUser(data);
        localStorage.setItem("currentUser", JSON.stringify(data));
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
