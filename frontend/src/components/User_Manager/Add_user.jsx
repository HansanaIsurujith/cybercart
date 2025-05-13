import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../../css/User_Manager/admin_dashboard.css";

function AddUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/sign-up",
        formData
      );
      console.log(response);
      if (response.data.success) {
        toast.success("User Added successful!");
        setTimeout(() => {
          navigate("/admin-dashboard");
        }, 1000);
      } else {
        toast.error(response.data.message || "Error in User Creation");
      }
    } catch (error) {
      console.error(error);
      toast.error("Account creation failed! Please try again.");
    }
  };

  return (
    <div id="add-user-container">
      <h2 id="add-user-heading">Add New User</h2>
      <form id="add-user-form" onSubmit={handleSubmit}>
        <div id="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>
        <div id="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div id="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div id="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div id="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div id="button-group">
          <button type="button" id="back-btn" onClick={() => navigate(-1)}>
            Back
          </button>
          <button type="submit" id="submit-btn">
            Add User
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddUser;
