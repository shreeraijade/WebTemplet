import React, { useContext } from 'react';
import './Profile.css'
import { AuthContext } from '../contexts/AuthContext';

const Profile = () => {
    const {user} = useContext(AuthContext);

    const {logout} = useContext(AuthContext);
  return (
    <div className='profile-body'>

<div class="profile-container">
        <div class="header">
            <div class="background-img"/>

            <div class="profile-info">
                <div className='img-name'>
                     <div class="profile-img"/>
                         <div className='main-info'>
                             <h1>{user.user.name}</h1>
                             <p>{user.type}</p>
                         </div>                    
                     </div>
                </div>  
                           
            </div>
             


      

            <div className='left-bar'>
                <div class="contact-info">
                    <p><strong>Mobile:</strong> {user.user.contact}</p>
                    <p><strong>Email:</strong> {user.user.email}</p>
                </div>
                <div className='mybuts'>
                   <button class="chat-button">Edit</button>
                   <button class="chat-button" onClick={()=>{ logout() }}>Logout</button>
                </div>
                
            </div>
            
     
        </div>

       
    </div>
      
    
  );
};

export default Profile;
