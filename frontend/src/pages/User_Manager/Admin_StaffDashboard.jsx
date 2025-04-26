import React from "react";
import Sidebar from "../../components/User_Manager/Admin_sidebar";
import Admin_Staff_Dashboard_Data from "../../components/User_Manager/admin_staff_data";

function Admin_StaffDashboard() {
  return (
    <div id="dashboard_container">
      <Sidebar />
      <div id="dashboard_data">
        <Admin_Staff_Dashboard_Data />
      </div>
    </div>
  );
}

export default Admin_StaffDashboard;
