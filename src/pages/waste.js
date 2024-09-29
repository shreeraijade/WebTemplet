import React, { useContext, useState, useEffect } from 'react';
import './waste.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Waste({ vendorList, setVendorList }) {
  const { user, setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState([false, false, false, false, false]);
  const [priceArray, setPriceArray] = useState(user.user.Prices ? [...user.user.Prices] : []);
  const navigate = useNavigate();

  // Function to fetch vendor data
  const fetchData = async () => {
    try {
      console.log("waste effect executing");
      const res = await fetch('http://localhost:8000/api/v1/vendor/getvendor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      console.log(data);
      setPriceArray(data.user.Prices);

      console.log(...priceArray);
      setUser({...data.user, type: "Vendor"});
      console.log(user);
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };

  // useEffect(() => {
  //   console.log("Fetching data...");
  //   if(user.type ==='Vendor'){
  //     fetchData();
  //   }     
  // }, []);

  // Function to handle clicking on a seller category
  const handleClickSeller = async (idx) => {
    try {
      const res = await fetch('http://localhost:8000/api/v1/seller/vendor-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ garbageNo: idx }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      localStorage.setItem("vendorList", JSON.stringify(data.respectiveVendors));
      setVendorList([...data.respectiveVendors]);
    } catch (error) {
      console.error("Fetch error in handleClickSeller: ", error);
    }
  };

  // Function to handle price changes
  const handleChange = (idx, value) => {
    const newArray = [...priceArray];
    newArray[idx] = value;
    setPriceArray(newArray);

    const newUser = { ...user };
    newUser.user.Prices = [...newArray];
    setUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
  };

  // Function to update price in the backend
  const updatePriceArray = async (idx, price) => {
    try {
      const res = await fetch('http://localhost:8000/api/v1/vendor/update-price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ GarbageNo: idx, Price: price, vendorid: user.user._id }),
      });

      const data = await res.json();
      console.log(data);

      const newEditingArray = [...isEditing];
      newEditingArray[idx - 1] = false; // Fixed the off-by-one issue
      setIsEditing(newEditingArray);
    } catch (error) {
      console.error("Error updating price: ", error);
    }
  };

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
            {categories.map((category, idx) => (
              <div key={category} className="category-card" onClick={() => {
                if (user.type === "Vendor") {
                  const newIsEditingArray = [...isEditing];
                  newIsEditingArray[idx] = true;
                  setIsEditing(newIsEditingArray);
                } else {
                  handleClickSeller(idx + 1);
                  navigate(`/waste/vendors/${category}`);
                }
              }}>
                {category}
                {
                  (user.type === "Vendor") ? (
                    isEditing[idx] ? (
                      <div className="price-update-container">
                        <input
                          type="number"
                          value={priceArray[idx]}
                          onChange={(e) => handleChange(idx, e.target.value)}
                        />
                        <button onClick={() => updatePriceArray(idx + 1, priceArray[idx])}>Update</button>
                      </div>
                    ) : <span className='price'>Price: Rs. {priceArray[idx]}</span>
                  ) : null
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Waste;
