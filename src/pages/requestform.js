import React, { useContext, useState } from 'react';
import './requestform.css'; // Make sure to import the CSS file
import { useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const WasteCollectionForm = () => {
  const {user} = useContext(AuthContext)
  const {wasteTypeNo} = useParams();
  const navigate = useNavigate();

  const catenum = Number( wasteTypeNo[wasteTypeNo.length-1])
  const vendorEmail=wasteTypeNo.slice(0,wasteTypeNo.length-1)
  // const waste = wasteTypeNo
let category = 1
  if(catenum===1){
    category = "PAPER"
}
if(catenum===2){
  category = "METAL"
}
if(catenum===3){
category = "E-WASTE"
}
if(catenum===4){
category = "BIO"
}
if(catenum===5){
category = "PLASTIC"
}


  const [formData, setFormData] = useState({
    firstName: user.user.name,
    
    email: user.user.email,
    phone: user.user.contact,
    weight: "",
    date: '',
   
  });


  const handleSubmit = async(e) => {
    e.preventDefault();
    let myObject = {...formData, vendor_email:vendorEmail, category}

    try {
      const res = await fetch('http://localhost:8000/api/v1/seller/requesttovendor',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            },
          body: JSON.stringify(myObject),
          credentials: "include"
        }
      )

      let data = await res.json();
      console.log(data);
      navigate("/waste");
      
    } catch (error) {
       alert(error);
       navigate("/waste")
    }
    console.log('Form submitted:', myObject);
  };

  return (
    <div className='form-body'>
        <div className='form'>
        <form className="contact-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Waste Collection Request</h2>

      <div className="form-group">
        <label htmlFor="firstName">Name*</label>
        <input className='req-inp'
          type="text"
          id="firstName"
          name="firstName"
          readOnly
          required
          value={formData.firstName}
          // onChange={handleChange}
        />
      </div>


      <div className="form-group">
        <label htmlFor="email">Email Address*</label>
        <input className='req-inp'
          type="email"
          id="email"
          name="email"
          readOnly
          required
          value={formData.email}
          // onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number*</label>
        <input className='req-inp'
          type="tel"
          id="phone"
          name="phone"
          readOnly
          required
          value={formData.phone}
          // onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="weight">Weight of Waste (kg)*</label>
        <input className='req-inp'
          type="number"
          id="weight"
          name="weight"
         
          required
          value={formData.weight}
          onChange={(e)=>{ 
            let currentWeight = e.target.value;
            let newObject = {...formData, weight: currentWeight}
            setFormData(newObject);

          }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="timeSlot">Preferred Date*</label>
        <input className='req-inp'
          type="date"
          id="timeSlot"
          name="timeSlot"
          placeholder="E.g. 10:00 AM - 12:00 PM"
          required
          value={formData.date}
          onChange={(e)=>{
            let currentDate = e.target.value;
            let newObject = {...formData, date: currentDate};
            setFormData(newObject)
          }}
        />
      </div>


      <button type="submit" className="submit-button">Submit</button>
    </form>

    
        </div>


        <div className='vendor-img'>
            <div className='act-img'></div>
        </div>
    </div>


    
  );
};

export default WasteCollectionForm;
