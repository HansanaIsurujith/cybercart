import axios from "axios";
import React, { useEffect, useState } from "react";
import Img1 from "../../../assets/User/graph1.avif";
import Img2 from "../../../assets/User/graph2.jpg";
import Img3 from "../../../assets/User/graph3.jpeg";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, adminRes] = await Promise.all([
          axios.get("http://localhost:5000/api/users"), // Assuming users endpoint
          axios.get("http://localhost:5000/api/admin"),
        ]);
        setUsers(userRes.data.users || []);
        setAdmins(adminRes.data.admin || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="dashboard-content">
      <h1>User Management</h1>
      <div className="dash-card-list">
        <div className="dash-cards">
          Total User Accounts
          <br />
          <h2>{users.length}</h2>
        </div>
        <div className="dash-cards">
          Total Staff Accounts
          <br />
          <h2>{admins.length}</h2>
        </div>
        <div className="dash-cards">
          All Accounts
          <br />
          <h2>{users.length + admins.length}</h2>
        </div>
      </div>
      <div className="dash-img-list">
        <img src={Img1} alt="Graph 1" />
        <img src={Img2} alt="Graph 2" />
        <img src={Img3} alt="Graph 3" />
      </div>
    </div>
  );
}

export default Dashboard;
