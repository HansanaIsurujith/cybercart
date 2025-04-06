import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Product Comparison</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/add-product">Add Product</Link>
        <Link to="/compare">Compare Products</Link>
      </div>
    </nav>
  );
};

export default Navbar;