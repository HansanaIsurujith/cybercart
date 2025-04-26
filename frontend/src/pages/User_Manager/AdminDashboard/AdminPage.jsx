import React from "react";
import Admin_sidebar from "../../../components/User_Manager/AdminDashboard/SideBar";
import "../../../css/User_Manager/AdminPage.css";
import { Outlet } from "react-router-dom";

function AdminPage() {
  return (
    <>
      <div className="admin-page">
        <Admin_sidebar />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AdminPage;
