import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WasteBarCharts = () => {
  // Sample data for waste categories
  const wasteCategories = ["Paper", "E-Waste", "Metal", "Bio", "Plastic"];
  const moneySpent = [300, 200, 500, 700, 400]; // Example values for money spent
  const wasteWeight = [450, 300, 650, 500, 300]; // Example values for weight

  // Data for money spent graph
  const moneyData = {
    labels: wasteCategories,
    datasets: [
      {
        label: "Money Spent",
        data: moneySpent,
        backgroundColor: ["#FF4C4C", "#FF2E2E", "#FF1C1C", "#FF0F0F", "#8B0000"], // Color palette
      },
    ],
  };

  // Data for weight graph
  const weightData = {
    labels: wasteCategories,
    datasets: [
      {
        label: "Waste Weight",
        data: wasteWeight,
        backgroundColor: ["#FF4C4C", "#FF2E2E", "#FF1C1C", "#FF0F0F", "#8B0000"], // Color palette
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{height:"80vh", display: "flex", justifyContent: "space-around", alignItems: "center", padding: "20px" }}>
      <div style={{ width: "45%" }}>
        <h3 style={{ textAlign: "center" }}>Money Spent</h3>
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
