import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import logo from "../../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";

function UserLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const login = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        userData
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
      return { success: false, message: "Login failed, please try again." };
    }
  };

  const validate = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.email) {
      formErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email is invalid";
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission
    if (validate()) {
      const data = await login(formData);
      if (data.success) {
        toast.success("Login Successful!");
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          navigate("/"); // Redirect after login
        }, 1000);
      } else {
        toast.error(
          data.message || "Login failed, please check your credentials."
        );
      }
    } else {
      toast.error("Please fix the errors in the form.");
    }
  };

  return (
    <div>
      <div id="container">
        <div className="image-column">
          <img id="image_logo" src={logo} alt="Logo" />
        </div>

        <div className="form-column">
          <h2>Login Here</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UserLogin;
