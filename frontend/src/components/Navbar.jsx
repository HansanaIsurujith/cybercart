import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserName("");
    navigate("/");
  };

  const goProfile = () => {
    navigate(`/profile/${userId}`);  // Pass userId to profile route
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // User is logged in

      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.name);
      setUserId(decodedToken.id);
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">CyberCart</Link>
      </div>
      <div className="navbar-links">
        <Link to="/original">Home</Link>
        <Link to="/product">Products</Link>
        {isLoggedIn ? (
          <>
            <span onClick={goProfile} style={{cursor: "pointer"}}>Hi, {userName}</span>
            <Link onClick={logout} type="button">
              Log Out
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/sign-up">Sign-up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
