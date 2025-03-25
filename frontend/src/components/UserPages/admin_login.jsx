import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "../../css/UserCss/admin_login.css";

function admin_login() {
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
        navigate("/admin_dashboard"); // Redirect after login
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
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Admin Login</h2>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default admin_login;
