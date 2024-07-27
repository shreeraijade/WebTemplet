import React, { useState, useContext } from 'react';
import './HomePage.css'
import {Link} from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';


const HomePage = () => {
    const {isLoggedIn} = useContext(AuthContext);
    const [regButton, SetRegButton] = useState(<>
    <Link to='/signUp'><button  className='main-button'>Register</button></Link>
    </>)

  return (
    <div className='home-body'>
        <section className='Home-section'>
           <h1>Home Page Section1</h1>
           {isLoggedIn? <></>:regButton}
                     
        </section>

        <section className='Home-section'>
           <h1>Home Page Section2</h1>
           
        </section>

        <section className='Home-section'>
           <h1>Home Page Section3</h1>
           
        </section>
     
    </div>
  );
};

export default HomePage;
