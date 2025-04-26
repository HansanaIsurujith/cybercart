import React from "react";
import Sidebar from "../../components/User_Manager/Admin_sidebar";
import Admin_Dashboard_Data from "../../components/User_Manager/Admin_dashboardData";

function Admin_Dashboard() {
  return (
    <div id="dashboard_container">
      <Sidebar />
      <div id="dashboard_data">
        <Admin_Dashboard_Data />
      </div>
    </div>
  );
}

export default Admin_Dashboard;
