import React from "react";
import { FaUserCircle } from "react-icons/fa"; // Placeholder icon for profile picture
import "./noti.css"; // Import custom CSS for styling

const notifications = [
  { id: 1, type: "Paper", title: "Paper waste collected", description: "John Doe has reported a paper waste collection.", name: "John Doe", time: "24 Sep 2024 at 9:30 AM" },
  { id: 2, type: "E-Waste", title: "E-Waste disposal", description: "Jane Smith has submitted an e-waste item for recycling.", name: "Jane Smith", time: "23 Sep 2024 at 10:00 AM" },
  { id: 3, type: "Plastic", title: "Plastic waste pickup", description: "David Brown requested a plastic waste pickup.", name: "David Brown", time: "22 Sep 2024 at 12:15 PM" },
  { id: 4, type: "Metal", title: "Metal scrap collection", description: "Michael Johnson reported a metal scrap collection.", name: "Michael Johnson", time: "21 Sep 2024 at 1:30 PM" },
  { id: 5, type: "Bio", title: "Bio-waste disposal", description: "Sarah White scheduled a bio-waste disposal.", name: "Sarah White", time: "20 Sep 2024 at 3:45 PM" },
  { id: 6, type: "Plastic", title: "Plastic bottles recycling", description: "Chris Green requested a recycling pickup.", name: "Chris Green", time: "19 Sep 2024 at 11:00 AM" },
  { id: 7, type: "Paper", title: "Paper waste clearance", description: "Anna Black reported paper waste.", name: "Anna Black", time: "18 Sep 2024 at 9:00 AM" },
  { id: 8, type: "E-Waste", title: "E-Waste drop-off", description: "David King has an e-waste drop-off scheduled.", name: "David King", time: "17 Sep 2024 at 2:00 PM" },
  { id: 9, type: "Metal", title: "Metal cans collection", description: "Emily Stone reported metal cans for recycling.", name: "Emily Stone", time: "16 Sep 2024 at 4:00 PM" },
  { id: 10, type: "Bio", title: "Bio-compost delivery", description: "Lucas White requested bio-compost delivery.", name: "Lucas White", time: "15 Sep 2024 at 5:30 PM" },
];

const NotificationPage = () => {
  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <div key={notification.id} className="notification-item">
          <div className="profile-photo">
            <FaUserCircle size={40} />
          </div>
          <div className="notification-details">
            <div className="notification-header">
              <span className={`badge ${notification.type.toLowerCase()}`}>{notification.type}</span>
              <span className="notification-time">{notification.time}</span>
            </div>
            <h4 className="notification-title">{notification.name}</h4>
            
            <p className="notification-name">{notification.title}</p>
            <div className="action-buttons">
              <button className="accept-btn">Accept</button>
              <button className="reject-btn">Reject</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationPage;
