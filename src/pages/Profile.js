import React from 'react';
import './Profile.css'

const Profile = () => {
  return (
    <div className='profile-body'>

<div class="profile-container">
        <div class="header">
            <div class="background-img"/>

            <div class="profile-info">
                <div className='img-name'>
                     <div class="profile-img"/>
                     <div className='main-info'>
                         <h1>Shreyas Raijade</h1>
                         <p>Advisor and Consultant at MicroSoft Inc.</p>
                     </div>                    
                </div>
                
                <div class="social-links">
                    <a href="#">shreyas-raijade02</a>
                    <a href="#">shreyas.raijade</a>
                    <a href="#">shreyas_raijade</a>
                </div>
            </div>    
            
        </div>


        <div className='extra-info'>

            <div className='left-bar'>
                <div class="contact-info">
                    <p><strong>Office:</strong> +7911 0189830</p>
                    <p><strong>Mobile:</strong> +7404 1414777</p>
                    <p><strong>Email:</strong> shreyas.raijade@gmail.com</p>
                </div>
                <div class="rating">
                    <p>4.5 <span>★</span> (133 reviews)</p>
                </div>
                <button class="chat-button">Chat</button>
            </div>

        <div class="cards-container">
            <div class="card">
                <h2>Introduction</h2>

            </div>
            <div class="card">
                <h2>Loan Calculator</h2>

            </div>
            
        </div>
        </div>

       
    </div>
      
    </div>
  );
};

export default Profile;
