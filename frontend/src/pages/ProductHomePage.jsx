import React from "react";
import ProductList from "../components/ProductList";
import Navbar from "../components/ProductNavbar";

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <h1>Welcome to Product Comparison</h1>
      <ProductList />
    </div>
  );
};

export default HomePage;
