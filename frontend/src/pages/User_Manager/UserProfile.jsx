import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/User_Manager/UserProfile.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    full_name: "",
    email: "",
    address: "",
    phone: "",
  });

  const [userId, setUserId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      setUserId(decoded.id);

      // Make an API call to fetch user data if available
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/user/${decoded.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.success) {
            setUser(response.data.user);
            setFormData({
              ...response.data.user,
              password: "",
            });
          } else {
            setError("Failed to load user data.");
          }
        } catch (err) {
          console.error("Error fetching user data", err);
          setError("Error fetching user data.");
        }
      };

      fetchUserData();
    } catch (error) {
      console.error("Invalid token", error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    // Form validation
    if (formData.phone && formData.phone.length !== 10) {
      setError("Phone number must be 10 digits.");
      return;
    }

    if (formData.password && formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/user/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        const updatedUser = { ...formData };
        delete updatedUser.password;

        setUser(updatedUser);
        setIsEditing(false);
        setError("");

        // Store updated token if available
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }

        alert("Profile updated successfully.");
      } else {
        alert("Update failed.");
      }
    } catch (err) {
      console.error("Update failed", err);
      setError("Error updating profile.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your profile?"))
      return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        localStorage.removeItem("token");
        navigate("/register");
      } else {
        alert("Deletion failed.");
      }
    } catch (err) {
      console.error("Deletion failed", err);
      alert("Error deleting profile.");
    }
  };

  return (
    <div id="profile-container">
      <div id="profile-card">
        <div id="avatar-section">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
              user.full_name
            )}`}
            alt="avatar"
            id="avatar"
          />
        </div>

        <div id="user-info">
          {isEditing ? (
            <>
              <input
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                placeholder="Full Name"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
              <input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
              />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
              />
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="New Password (optional)"
              />
              {error && <p style={{ color: "red" }}>{error}</p>}
            </>
          ) : (
            <>
              <h2>{user.full_name}</h2>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Address:</strong> {user.address}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
            </>
          )}
        </div>

        <div id="profile-actions">
          {isEditing ? (
            <>
              <button onClick={handleUpdate}>💾 Save</button>
              <button onClick={() => setIsEditing(false)}>❌ Cancel</button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
              <button onClick={handleDelete}>🗑️ Delete</button>
              <button onClick={() => navigate("/")}>🏠 Home</button>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              >
                🚪 Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
