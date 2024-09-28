import React, { useState } from 'react';
import './requestform.css'; // Make sure to import the CSS file

const WasteCollectionForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    
    email: '',
    phone: '',
    weight: '',
    timeSlot: '',
   
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
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

          required
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>


      <div className="form-group">
        <label htmlFor="email">Email Address*</label>
        <input className='req-inp'
          type="email"
          id="email"
          name="email"
         
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number*</label>
        <input className='req-inp'
          type="tel"
          id="phone"
          name="phone"
          
          required
          value={formData.phone}
          onChange={handleChange}
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
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="timeSlot">Preferred Time Slot*</label>
        <input className='req-inp'
          type="text"
          id="timeSlot"
          name="timeSlot"
          placeholder="E.g. 10:00 AM - 12:00 PM"
          required
          value={formData.timeSlot}
          onChange={handleChange}
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
