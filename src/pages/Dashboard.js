import React, { useState, useEffect } from "react";

const DisplayTable = ({ data }) => {
  return (
    <table style={{ width: "60%", margin: "20px auto", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ padding: "8px", backgroundColor: "#f2f2f2", textAlign: "left" }}>Rank</th>
          <th style={{ padding: "8px", backgroundColor: "#f2f2f2", textAlign: "left" }}>Name</th>
          <th style={{ padding: "8px", backgroundColor: "#f2f2f2", textAlign: "left" }}>Score</th>
        </tr>
      </thead>
      <tbody>
        {/* Rendering the first three rows with different background colors if data exists */}
        {data.length > 0 && (
          <>
            <tr key={data[0]?.index} style={{ borderBottom: "1px solid #ddd", backgroundColor: '#f56a58', color: 'white' }}>
              <td style={{ padding: "8px" }}>1</td>
              <td style={{ padding: "8px", fontWeight: "bold" }}>
                {data[0].name}
                <div style={{ fontWeight: "normal", color: 'white', fontSize: "0.9em", paddingTop: "2px" }}>
                  {data[0].email}
                </div>
              </td>
              <td style={{ padding: "8px" }}>{data[0].sum}</td>
            </tr>
            {data[1] && (
              <tr key={data[1]?.index} style={{ borderBottom: "1px solid #ddd", backgroundColor: '#ff8e7f', color: 'white' }}>
                <td style={{ padding: "8px" }}>2</td>
                <td style={{ padding: "8px", fontWeight: "bold" }}>
                  {data[1].name}
                  <div style={{ fontWeight: "normal", color: 'white', fontSize: "0.9em", paddingTop: "2px" }}>
                    {data[1].email}
                  </div>
                </td>
                <td style={{ padding: "8px" }}>{data[1].sum}</td>
              </tr>
            )}
            {data[2] && (
              <tr key={data[2]?.index} style={{ borderBottom: "1px solid #ddd", backgroundColor: '#ffbdb4', color: 'white' }}>
                <td style={{ padding: "8px" }}>3</td>
                <td style={{ padding: "8px", fontWeight: "bold" }}>
                  {data[2].name}
                  <div style={{ fontWeight: "normal", color: 'white', fontSize: "0.9em", paddingTop: "2px" }}>
                    {data[2].email}
                  </div>
                </td>
                <td style={{ padding: "8px" }}>{data[2].sum}</td>
              </tr>
            )}
          </>
        )}

        {/* Rendering the remaining rows */}
        {data.map((item, idx) =>
          idx > 2 ? (
            <tr key={item.index} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "8px" }}>{idx + 1}</td>
              <td style={{ padding: "8px", fontWeight: "bold" }}>
                {item.name}
                <div style={{ fontWeight: "normal", color: "gray", fontSize: "0.9em", paddingTop: "2px" }}>
                  {item.email}
                </div>
              </td>
              <td style={{ padding: "8px" }}>{item.sum}</td>
            </tr>
          ) : null
        )}
      </tbody>
    </table>
  );
};

// Main Component
const App = () => {
  const [leader, setLeaders] = useState([]);

  const fetchLeaders = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/v1/seller/get-leaderboard', {
        method: 'POST', // Ensure your backend handles this correctly
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

      if (data && data.leaderArray) {
        setLeaders(data.leaderArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeaders();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Top Waste Crushers</h2>
      <DisplayTable data={leader} />
    </div>
  );
};

export default App;
