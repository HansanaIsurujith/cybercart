import React from "react";
import { Link } from "react-router-dom";
import "../../../css/User_Manager/Login_hub.css";

function Login_hub() {
  return (
    <div className="login-hub">
      <h1>Login Hub</h1>
      <p>Please select a section to log in.</p>
      <Link to="/product-manager-login">Product Manager</Link>
      <Link to="/user-manager-login">User Manager</Link>
      <Link to="#">Product</Link>
      <Link to="#">Product</Link>
    </div>
  );
}

export default Login_hub;
