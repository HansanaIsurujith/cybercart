import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import logo from "../../assets/homebg.jpeg";
import "../../css/User_Manager/User_loginPage.css";
import { useNavigate } from "react-router-dom";

function User_registerPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validate = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.full_name) {
      formErrors.full_name = "Name is required";
      isValid = false;
    }

    if (!formData.email) {
      formErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.phone) {
      formErrors.phone = "Phone is required";
      isValid = false;
    } else if (formData.phone.length < 10) {
      formErrors.phone = "Phone number must be 10 digits";
      isValid = false;
    }

    if (!formData.address) {
      formErrors.address = "Address is required";
      isValid = false;
    }

    if (!formData.password) {
      formErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/sign-up",
          formData
        );
        console.log(response);
        if (response.data.success) {
          toast.success("Account Created successful!");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          toast.error(response.data.message || "Error in User Creation");
        }
      } catch (error) {
        console.error(error); // Log the error for debugging
        toast.error("Account creation failed! Please try again.");
      }
    }
  };

  return (
    <div>
      <div id="container">
        <div className="image-column">
          <img id="image_logo" src={logo} alt="Logo" />
        </div>

        <div className="form-column">
          <h2>Register Here</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Full Name"
            />
            {errors.full_name && (
              <p style={{ color: "red" }}>{errors.full_name}</p>
            )}

            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

            <input
              type="number"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
            />
            {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}

            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
            />
            {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}

            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default User_registerPage;
