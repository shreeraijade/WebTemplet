import React, { useContext } from 'react';
import './HomePage.css'
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';



const HomePage = () => {
    const {isLoggedIn, user, setUser} = useContext(AuthContext);
    
    const navigate = useNavigate();

  return (
    <div className='home-body'>
        <section className='Home-section'>
    <div className='homesec'>
        <div className='info'>
            <span>Welcome to <span className='tag'>WasteWell</span>,</span>
            <span>
                your trusted partner in sustainable waste management solutions. We are committed to providing 
                efficient, eco-friendly, and reliable waste disposal services to communities, businesses, and 
                industries. Our goal is to reduce landfill waste and promote recycling, ensuring a cleaner, 
                greener environment for future generations.
            </span>
            <button className='explore-button' onClick={() => {
                setUser({...user, button: "in"})
                isLoggedIn ? navigate("/waste") : navigate("/options")
            }}>
                Explore More...
            </button>
        </div>
    </div>
    <div className='homesec'>
        <div className='boy-image'></div>
    </div>
</section>


        <section className='Home-section'>
    <div className='homesec'>
        <div className='boy-image2'></div>
    </div>
    <div className='homesec'>
        <div className='text-content'>
            <h2>Effective Waste Management</h2>
            <p>
                Waste management is crucial for maintaining a clean and sustainable environment. By properly 
                segregating waste, recycling materials, and reducing waste generation, we can minimize our 
                environmental impact. Let's work together to promote responsible waste disposal and create a 
                greener future.
            </p>
        </div>
    </div>
</section>


        <section className='Home-section'>
        <div className='homesec'>
    <div className='waste-info'>
        <h2>Why Waste Management Matters</h2>
        <p>
            Effective waste management is essential for maintaining a healthy environment. By properly disposing of waste,
            recycling materials, and reducing the amount of waste we generate, we can significantly decrease pollution
            and conserve valuable resources. WasteWell is dedicated to providing sustainable waste solutions that not only
            help communities but also protect our planet for future generations. Join us in making a positive impact!
        </p>
    </div>
</div>

           <div className='homesec'>
           <div className=' machine-image '></div>
           </div>
           
        </section>
     
    </div>
  );
};

export default HomePage;
