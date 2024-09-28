import React, { useState, useContext } from 'react';
import './HomePage.css'
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';



const HomePage = () => {
    const {isLoggedIn, user, setUser} = useContext(AuthContext);
    
    const navigate = useNavigate();

  return (
    <div className='home-body'>
        <section className='Home-section'>
          <div className='homesec'>
            <div className='info '>
            <span>Welcome to <span className='tag'>WasteWelll</span>,</span> 
            <span>your trusted partner in sustainable waste management solutions. We are committed to providing efficient, eco-friendly, and reliable waste disposal services to communities, businesses, and industries. Our goal is to reduce landfill waste and promote recycling, ensuring a cleaner, greener environment for future generations.</span>
            <button className='explore-button' onClick={() => {
                 setUser({...user, button: "in"})
                 isLoggedIn?navigate("/waste"):  navigate("/options")
            }}>Explore More...</button>
            </div>
          </div>
          <div className='homesec'>
            <div className=' boy-image '></div>
          </div>
                     
        </section>

        <section className='Home-section'>
           <div className='homesec'>
           <div className=' boy-image2 '></div>
           </div>
           <div className='homesec'></div>
        </section>

        <section className='Home-section'>
           <div className='homesec'></div>
           <div className='homesec'>
           <div className=' machine-image '></div>
           </div>
           
        </section>
     
    </div>
  );
};

export default HomePage;
