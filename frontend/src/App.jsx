import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductHomePage from "./pages/ProductHomePage";
import AddProductPage from "./pages/AddProductPage";
import ComparePage from "./pages/ComparePage";
import ProductPage from "./pages/ProductPage";
import "../src/css/styles.css";
import Homepage from "./pages/HomePage";
// user login and register pages..........
import Singup from "./pages/User_Manager/User_registerPage";
import Login from "./pages/User_Manager/LoginHub/UserLogin";
// user manager login pages..........
import AdminRegister from "./pages/User_Manager/LoginHub/Admin_registerPage";
import LoginHub from "./pages/User_Manager/LoginHub/Login_hub";
import UserManagerLogin from "./pages/User_Manager/LoginHub/UserLogin";
import ProductManagerLogin from "./pages/User_Manager/LoginHub/ProductLogin";
// user manager dashboard..........
import UpdateUser from "./components/User_Manager/Update_user";
import AddUser from "./components/User_Manager/Add_user";
import AdminDashboardPage from "./pages/User_Manager/AdminDashboard/AdminPage";
import DashboardComp from "./components/User_Manager/AdminDashboard/Dashboad";
import UserAccounts from "./components/User_Manager/AdminDashboard/UserAccount";
import StaffAccounts from "./components/User_Manager/AdminDashboard/StaffAccount";
//................
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* Product Manager............................................ */}
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product-dashboad" element={<ProductHomePage />} />

        {/* User Manger dashboard............................................  */}
        <Route path="/admin-dashboard" element={<AdminDashboardPage />}>
          <Route index element={<DashboardComp />} />
          <Route path="dashboard" element={<DashboardComp />} />
          <Route path="user-accounts" element={<UserAccounts />} />
          <Route path="staff-accounts" element={<StaffAccounts />} />
        </Route>
        <Route path="/admin_update_user/:id" element={<UpdateUser />} />
        <Route path="/admin_add_user" element={<AddUser />} />
        {/* User Manger login pages............................................  */}
        <Route path="/sign-up" element={<Singup />} />
        <Route path="/admin_register" element={<AdminRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/LoginHub" element={<LoginHub />} />
        <Route path="/user-manager-login" element={<UserManagerLogin />} />
        <Route path="/product-manager-login" element={<ProductManagerLogin />}/>
      </Routes>
    </Router>
  );
}

export default App;
