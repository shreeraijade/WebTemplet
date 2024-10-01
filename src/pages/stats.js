import React, { useContext, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { AuthContext } from "../contexts/AuthContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WasteBarCharts = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  // const [moneyTag, setMoneyTeg] = useState("")
  let scoreArray = []

  if(user.type==="Vendor"){
    scoreArray = user?.user?.Total_Garbage ? [...user.user.Total_Garbage] : []
  } else{
    scoreArray = user?.user?.scores ? [...user.user.scores] : []
  }
  
  const [score, setScore] = useState(scoreArray);
  let moneyTag = "";
  
  if(user.type === "Vendor"){
    moneyTag = "Money Spent"
  } else{
    moneyTag = "Money Earned"
  }

  if (!user) {
    // If user data is not yet available, return a loader or null
    return <div>Loading...</div>;
  }

  const wasteCategories = ["Paper",  "Metal", "E-Waste", "Bio", "Plastic"];
  
  const defaultMoney = [300, 200, 500, 700, 400];
  const defaultWeight = [450, 300, 650, 500, 300];

  let moneyData = {};
  let weightData = {};

  if (user.type === "Vendor") {
    moneyData = {
      labels: wasteCategories,
      datasets: [
        {
          label: "Money Spent",
          data: defaultMoney,
          backgroundColor: ["#f44336", "#9c27b0", "#ff9800", "#4caf50", "#03a9f4"],
        },
      ],
    };


    

    

    
    
    


    weightData = {
      labels: wasteCategories,
      datasets: [
        {
          label: "Waste Weight",
          data: score,
          backgroundColor: ["#f44336", "#9c27b0", "#ff9800", "#4caf50", "#03a9f4"],
        },
      ],
    };
  } else {
    moneyData = {
      labels: wasteCategories,
      datasets: [
        {
          label: "Money Earned",
          data: score,
          backgroundColor: ["#f44336", "#9c27b0", "#ff9800", "#4caf50", "#03a9f4"],
        },
      ],
    };

    weightData = {
      labels: wasteCategories,
      datasets: [
        {
          label: "Waste Weight",
          data: defaultWeight,
          backgroundColor: ["#f44336", "#9c27b0", "#ff9800", "#4caf50", "#03a9f4"],
        },
      ],
    };
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div style={{ width: "45%" }}>
        <h3 style={{ textAlign: "center" }}>{moneyTag}</h3>
        <Bar data={moneyData} options={options} />
      </div>
      <div style={{ width: "45%" }}>
        <h3 style={{ textAlign: "center" }}>Waste Weight</h3>
        <Bar data={weightData} options={options} />
      </div>
    </div>
  );
};

export default WasteBarCharts;
