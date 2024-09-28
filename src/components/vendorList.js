import React from "react";
import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./vendorList.css"; // Import custom CSS for styling
import { useNavigate } from "react-router-dom";

const vendors = [
    {
      id: 1,
      name: "Green Recycle Ltd.",
      type: "paper",
      address: "123 Green Lane, Springfield, IL",
      email: "contact@greenrecycle.com",
      price: "10"
    },
    {
      id: 2,
      name: "Eco Electronics",
      type: "e-waste",
      address: "456 Tech Street, Austin, TX",
      email: "info@ecoelectronics.com",
      price: "10"
    },
    {
      id: 3,
      name: "Plastic Solutions",
      type: "plastic",
      address: "789 Plastic Rd, Miami, FL",
      email: "service@plasticsolutions.com",
      price: "10"
    },
    {
      id: 4,
      name: "Metal Masters",
      type: "metal",
      address: "101 Steel Ave, Denver, CO",
      email: "support@metalmasters.com",
      price: "10"
    },
    {
      id: 5,
      name: "Bio Organics",
      type: "bio",
      address: "202 Organic Blvd, Seattle, WA",
      email: "sales@bioorganics.com",
      price: "10"
    },
    {
      id: 6,
      name: "Paper Waste Services",
      type: "paper",
      address: "303 Paper St, Columbus, OH",
      email: "contact@paperwaste.com",
      price: "10"
    },
    {
      id: 7,
      name: "E-Waste Recycler",
      type: "e-waste",
      address: "404 Gadget Way, Atlanta, GA",
      email: "info@ewasterecycler.com",
      price: "10"
    },
    {
      id: 8,
      name: "Plastic Recycler Pro",
      type: "plastic",
      address: "505 Ocean Dr, Los Angeles, CA",
      email: "service@plasticrecyclerpro.com",
      price: "10"
    },
    {
      id: 9,
      name: "Scrap Metal Traders",
      type: "metal",
      address: "606 Rusty Lane, Houston, TX",
      email: "support@scrapmetaltraders.com",
      price: "10"
    },
    {
      id: 10,
      name: "Organic Waste Collectors",
      type: "bio",
      address: "707 Green Valley, Portland, OR",
      email: "sales@organiccollectors.com",
      price: "10"
    },
  ];
  

const VendorsList = () => {
  const { wasteType } = useParams(); 

  const navigate = useNavigate();

  
  const filteredVendors = vendors.filter(
    (vendor) => vendor.type.toLowerCase() === wasteType.toLowerCase()
  );
  
  return (
    <div className="vendor-body">
    <div className="vendor-container">
      {filteredVendors.length > 0 ? (
        filteredVendors.map((vendor) => (
          <div key={vendor.id} className="vendor-item">
            <div className="profile-photo">
              <FaUserCircle size={40} />
            </div>
            <div className="vendor-details">
              <div className="vendor-header">
                <h4 className="vendor-name">{vendor.name}</h4>
                <span className={`badge ${vendor.type.toLowerCase()}`}>
                  {vendor.type}
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
                     navigate("/waste/vendors/request")
                }}>Select</button>
                <button className="reject-btn">Price {vendor.price}Rs</button>
                
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
