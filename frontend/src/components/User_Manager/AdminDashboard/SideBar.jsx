import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FaHome, FaUser, FaUserFriends } from "react-icons/fa";

function SideBar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsLoggedIn(true);
        setUserName(decodedToken.name || "Admin");
      } catch (err) {
        console.error("Invalid token:", err);
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        navigate("/");
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [navigate]);
  return (
    <>
      <div className="admin-sidebar">
        <h2>CyberCart</h2>
        {isLoggedIn && <h3>Hi {userName}</h3>}
        <ul className="admin-sidebar-list">
          <NavLink
            className="links"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#9689e8" : "transparent",
            })}
            to="dashboard"
          >
            <FaHome /> Dashboard
          </NavLink>
          <NavLink
            className="links"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#9689e8" : "transparent",
            })}
            to="user-accounts"
          >
            <FaUser /> User Accounts
          </NavLink>
          <NavLink
            className="links"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#9689e8" : "transparent",
            })}
            to="staff-accounts"
          >
            <FaUserFriends /> Staff Accounts
          </NavLink>
        </ul>
        {!isLoggedIn && <button onClick={logout}>LogIn</button>}
        {isLoggedIn && <button onClick={logout}>Log Out</button>}
      </div>
    </>
  );
}

export default SideBar;
