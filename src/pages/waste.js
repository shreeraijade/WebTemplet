import React from 'react'
import './waste.css'
import { useNavigate } from 'react-router-dom';

function Waste() {
   
    const navigate = useNavigate();


  const categories = ["PAPER", "METAL", "E-WASTE", "BIO", "PLASTIC"];
  return (
    <div className='waste-body'>
        <div className='waste-left'>
            <div className='dust-image'></div>
        </div>
        <div className='waste-right'>
        <div className="select-category-container">
        <h1 className="select-category-title">Select Category</h1>
      <div className="category-grid">
        {categories.map((category) => (
          <div key={category} className="category-card" onClick={()=>{
              navigate(`/waste/vendors/${category}`)
          }}>
            {category}
          </div>
        ))}
      </div>
    </div>
        </div>      
    </div>
  )
}

export default Waste
