import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../../../css/UserCss/admin_dashboard.css";

function admin_sidebar() {
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
      setIsLoggedIn(true);

      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.name);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <h3 className="nav-head">Hi ! {userName}</h3>
      <ul>
        <li>
          <a href="#">Dashboard</a>
        </li>
        <li>
          <a href="#">Users</a>
        </li>
        <li>
          <a href="#">Settings</a>
        </li>
        <li>
          <button className="login-btn" onClick={logout} type="submit">
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
}

export default admin_sidebar;
