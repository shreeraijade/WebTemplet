import React, { useContext } from 'react';
import './options.css'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const OptionBody = () => {

    const {user, setUser} = useContext(AuthContext);
    const navigate = useNavigate();
  return (
    <div className='options' >

      <span>Select Your Role</span>

      <div className='option-body'>
      <div className='seller' onClick={()=>{
        setUser({...user, type: "Vendor"})
        user.button=="in"? navigate("/login") : navigate("/signup")
       }}>
        <span>Vendor</span>
        <div className='seller-img'></div>
      </div>





      <div className='vendor' onClick={()=>{
        setUser({...user, type: "Seller"})
        user.button=="up"? navigate("/signup") : navigate("/login")
       }}>
        <span>Seller</span>
        <div className='vendour-img'></div>
      </div>
    </div> 
    </div>
      
  );
};

export default OptionBody;
