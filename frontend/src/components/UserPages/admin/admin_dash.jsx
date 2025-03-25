import React from "react";
import Sidebar from "./admin_sidebar";
import UserTable from "./admin_dash_data";
import "../../../css/UserCss/admin_dashboard.css";

function admin_dash() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <h1>Admin Dashboard</h1>
        <UserTable />
      </div>
    </div>
  );
}

export default admin_dash;
