import React from "react";
import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <div className="home-content">
        <h2>Welcome to CyberCart</h2>
        <p>Your one-stop shop for all your product needs.</p>
        <p>Explore our wide range of products and find the best deals!</p>
      </div>
    </div>
  );
};

export default HomePage;
