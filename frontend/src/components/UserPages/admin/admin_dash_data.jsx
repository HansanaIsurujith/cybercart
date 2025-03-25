import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState, useParams } from "react";
import { jsPDF } from "jspdf";
import "../../../css/UserCss/admin_dashboard.css";

function admin_dash_data() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  // Fetch all users
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("http://localhost:5000/api/users"); // Get users from the backend
        setUsers(response.data.users);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }

    fetchUsers();
  }, []); // runs once on mount

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/user/${id}`
      );
      if (response.data.success) {
        // Remove the deleted user from the users state to update the UI
        setUsers(users.filter((user) => user._id !== id));
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  function handleAddUser() {
    navigate("/admin_add_user");
  }

  const handleUpdateUser = (userId) => {
    navigate(`/admin_update_user/${userId}`);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Admin Report", 20, 20);
    doc.setFontSize(12);
    doc.text("Generated on: " + new Date().toLocaleDateString(), 20, 30);

    // Table Headers
    let yPos = 40; // Start position for table
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Full Name", 20, yPos);
    doc.text("Email", 70, yPos);
    doc.text("Address", 120, yPos);
    doc.text("Phone", 170, yPos);
    yPos += 10; // Move to the next line

    // Table Rows (User Details)
    users.forEach((user) => {
      doc.setFont("helvetica", "normal");
      doc.text(String(user.full_name), 20, yPos); // Ensure text is a string
      doc.text(String(user.email), 70, yPos);
      doc.text(String(user.address), 120, yPos);
      doc.text(String(user.phone), 170, yPos);
      yPos += 10; // Move to the next line
    });

    doc.save("admin_report.pdf");
  };

  return (
    <div className="user-table">
      <h2>Manage Users</h2>
      <button id="add" onClick={handleAddUser}>
        Add User
      </button>
      <br />
      <button id="add" onClick={generatePDF}>
        Report
      </button>
      <br />
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.full_name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.phone}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleUpdateUser(user._id)}
                >
                  Update
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default admin_dash_data;
