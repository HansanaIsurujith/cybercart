import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import usermanager from "../../../assets/usermanager.png";
import { ToastContainer, toast } from "react-toastify";

function UserLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const login = async (userData) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/adminLogin`,
        userData
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else {
        toast.error("Network error, please try again later.");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission
    const data = await login(formData);
    if (data.success) {
      toast.success("Login Successful!");
      localStorage.setItem("token", data.token);
      setTimeout(() => {
        navigate("/user_dashboard"); // Redirect after login
      }, 1000);
    } else {
      toast.error(
        data.message || "Login failed, please check your credentials."
      );
    }
  };
  return (
    <>
      <div className="login-container">
        <div className="image-container">
          <img src={usermanager} alt="" />
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <h2>User Manager Login</h2>
          <div className="input-group" id="email-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>
          <div className="input-group" id="password-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" id="login-btn">
            Login
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default UserLogin;
