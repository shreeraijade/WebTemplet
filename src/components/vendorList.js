import React from "react";
import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./vendorList.css"; // Import custom CSS for styling
import { useNavigate } from "react-router-dom";
import WasteCollectionForm from "../pages/requestform";


  

const VendorsList = ({vendorList, setVendorList}) => {
  const { wasteType } = useParams(); 

  const navigate = useNavigate();

  const filteredVendors = [...vendorList]
   let idx = 4;
  if(wasteType==="PAPER"){
      idx = 0;
  }
  if(wasteType==="METAL"){
    idx = 1;
}
if(wasteType==="E-WASTE"){
  idx = 2;
}
if(wasteType==="BIO"){
  idx = 3;
}
if(wasteType==="PLASTIC"){
  idx = 4;
}



  
  // const filteredVendors = vendorList.filter(
  //   (vendor) => vendor.type.toLowerCase() === wasteType.toLowerCase()
  // );
  
  return (
    <div className="vendor-body">
    <div className="vendor-container">
      {filteredVendors?.length > 0 ? (
        filteredVendors.map((vendor) => (
          <div key={vendor._id} className="vendor-item">
            <div className="profile-photo">
              <FaUserCircle size={40} />
            </div>
            <div className="vendor-details">
              <div className="vendor-header">
                <h4 className="vendor-name">{vendor.name}</h4>
                <span className={`badge ${wasteType}`}>
                  {wasteType}
                </span>
              </div>
              <p className="vendor-address">
                <strong>Address:</strong> {vendor.address}
              </p>
              <p className="vendor-email">
                <strong>Email:</strong> {vendor.email}
              </p>
              <div className="action-buttons">
                <button className="accept-btn" onClick={()=>{
                     
                     navigate(`/waste/vendors/request/${vendor.email}${idx+1}`)
                }}>Select</button>
                <button className="reject-btn">Price {vendor.Prices[idx]}Rs</button>
                
              </div>
            </div>

            
          </div>
        ))
      ) : (
        <p>No vendors available for the specified waste type.</p>
      )}
    </div>
    
    </div>
  );
};

export default VendorsList;
