import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import "../../css/User_Manager/admin_dashboard.css";

function UpdateUser() {
  const navigate = useNavigate();
  const { userId } = useParams();

  console.log("User ID:", userId);

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

  useEffect(() => {
    // Fetch user data when component mounts
    async function fetchUserData() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${userId}`
        );
        if (response.data.success) {
          setFormData(response.data.user);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/${userId}`,
        formData
      );
      if (response.data.success) {
        toast.success("User updated successfully!");
        setTimeout(() => {
          navigate("/admin_dashboard");
        }, 1000);
      } else {
        toast.error("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("An error occurred while updating the user.");
    }
  };

  return (
    <div id="user-form-container">
      <h2 id="user-form-heading">Update User</h2>
      <form id="user-form" onSubmit={handleSubmit}>
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
            Update User
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default UpdateUser;
