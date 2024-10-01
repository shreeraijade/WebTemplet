import React, { useContext, useEffect, useState, useCallback } from "react";
import { FaUserCircle } from "react-icons/fa"; // Placeholder icon for profile picture
import "./noti.css"; // Import custom CSS for styling
import { AuthContext } from "../contexts/AuthContext";

const NotificationPage = () => {
  // Retrieve user from local storage and parse it into an object
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));
  const { user, setUser } = useContext(AuthContext);

  // Use notifications from the stored user if available
  const [notifications, setNotifications] = useState(storedUser?.user?.Notifications || []);

  // const fetchVendor = useCallback(async () => {
  //   try {
  //     const res = await fetch('http://localhost:8000/api/v1/vendor/getvendor', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       credentials: "include"
  //     });

  //     if (!res.ok) {
  //       throw new Error('Failed to fetch vendor data');
  //     }

  //     const data = await res.json();
  //     console.log(data);
  //     setUser({...data});
  //     localStorage.setItem('currentUser', JSON.stringify(data));

  //     // Update notifications state and user state              `
  //     // setNotifications([...data.user.Notifications] || []);
      
  //     // Update user context and local storage
      
      

  //   } catch (error) {
  //     console.error("Unable to fetch vendor data:", error);
  //     alert("Unable to fetch notifications");
  //   }
  // }, [setUser]); // Removed `notifications` dependency, added `setUser`

/// `notifications` removed from dependencies

  const handleAccept = async (notification) => {
    let idx = 1;
    if (notification.category === "PAPER") {
      idx = 0;
    }
    if (notification.category === "METAL") {
      idx = 1;
    }
    if (notification.category === "E-WASTE") {
      idx = 2;
    }
    if (notification.category === "BIO") {
      idx = 3;
    }
    if (notification.category === "PLASTIC") {
      idx = 4;
    }
    
    let myObject = {
      user_email: notification.user_email,
      category: notification.category,
      RequestId: notification.requestId,
      weight: notification.weight,
      user_address: notification.user_address,
      category_number: idx,
    };

    try {
      const res = await fetch('http://localhost:8000/api/v1/vendor/confirmseller', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(myObject),
        credentials: "include"
      });

      let data = await res.json();
      console.log(data);
      setNotifications([...data.user.Notifications]); // Clear notifications or refetch if needed
      setUser({user: data.user, type: "Vendor"});
      localStorage.setItem('currentUser', JSON.stringify(data));

    } catch (error) {
      console.error("Error accepting notification:", error);
    }
  };

  const handleReject = async(notification) => {
    
    
    let myObject = {
      email: notification.user_email,
      category: notification.category,
      RequestId: notification.requestId,

    };
    console.log(myObject);

    try {
      const res = await fetch('http://localhost:8000/api/v1/vendor/rejectseller', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(myObject),
        credentials: "include"
      });

      let data = await res.json();
      console.log(data);
      setNotifications([...data.user.Notifications]); // Clear notifications or refetch if needed
      setUser({type: "Seller",user: data.user});
      localStorage.setItem('currentUser', JSON.stringify(data));

    } catch (error) {
      console.error("Error accepting notification:", error);
    }
  };


  const deleteNotification = async(notification)=>{

  }

  

  return (

    (user.type === "Vendor") ?(
      <div className="notification-container">
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <div key={index} className="notification-item">
            <div className="profile-photo">
              <FaUserCircle size={40} />
            </div>
            <div className="notification-details">
              <div className="notification-header">
                <span className={`badge ${notification.category?.toLowerCase()}`}>{notification.category}</span>
                <span className="notification-time">{notification.date}</span>
              </div>
              <h4 className="notification-title">{notification.name} <span style={{ marginLeft: "40px" }}>Contact No.</span> <span style={{ color: "blue" }}>{notification.user_contact}</span></h4>
              
              <p className="notification-name">{notification.weight} Kg.</p>
              <div className="action-buttons">
                <button className="accept-btn" onClick={() => { handleAccept(notification) }}>Accept</button>
                <button className="reject-btn" onClick={()=>{handleReject(notification)}}>Reject</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="no-notifications">No notifications available</div>
      )}
    </div>
    ) : (<div className="notification-container">
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <div
  key={index}
  className="notification-item"
  style={{ backgroundColor: notification[0] === "D" ? "#7ae77e" : "#e95e5e" }}
>
  <div className="notification-details">
    <button 
    className="notification-close-btn" 
    style={{ backgroundColor: notification[0] === "D" ? "#7ae77e" : "#e95e5e" }}
    onClick={()=>{
      deleteNotification(notification)
    }}
    >X</button>
    <h4 className="notification-title">{notification}</h4>
  </div>
</div>


        ))
      ) : (
        <div className="no-notifications">No notifications available</div>
      )}
    </div>)
    
  );
};

export default NotificationPage;
