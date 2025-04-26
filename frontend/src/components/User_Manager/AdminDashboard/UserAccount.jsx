import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "../../../css/User_Manager/AdminPage.css";

function UserAccount() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Add state for search term
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data.users);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/user/${id}`
      );
      if (response.data.success) {
        setUsers(users.filter((user) => user._id !== id));
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleAddUser = () => {
    navigate("/admin_add_user");
  };

  const handleUpdateUser = (userId) => {
    navigate(`/admin_update_user/${userId}`);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Admin Report", 20, 20);
    doc.setFontSize(12);
    doc.text("Generated on: " + new Date().toLocaleDateString(), 20, 30);

    let yPos = 40;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Full Name", 20, yPos);
    doc.text("Email", 70, yPos);
    doc.text("Address", 120, yPos);
    doc.text("Phone", 170, yPos);
    yPos += 10;

    users.forEach((user) => {
      doc.setFont("helvetica", "normal");
      doc.text(String(user.full_name), 20, yPos);
      doc.text(String(user.email), 70, yPos);
      doc.text(String(user.address), 120, yPos);
      doc.text(String(user.phone), 170, yPos);
      yPos += 10;
    });

    doc.save("admin_report.pdf");
  };

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-management-container">
      <h2 className="user-management-title">Manage Users</h2>

      <div className="user-management-buttons">
        <button
          id="add-btn"
          className="user-button add-user-button"
          onClick={handleAddUser}
        >
          Add User
        </button>

        <button
          id="report-btn"
          className="user-button report-button"
          onClick={generatePDF}
        >
          Report
        </button>

        {/* Add the search input with onChange */}
        <input
          type="text"
          className="search-bar"
          placeholder="Search Users"
          value={searchTerm} // Bind the value to the state
          onChange={(e) => setSearchTerm(e.target.value)} // Update state on input change
        />
      </div>

      <div className="table-wrapper">
        <table id="user-table" className="user-table">
          <thead className="user-table-head">
            <tr>
              <th className="user-table-header">Full Name</th>
              <th className="user-table-header">Email</th>
              <th className="user-table-header">Address</th>
              <th className="user-table-header">Phone</th>
              <th className="user-table-header">Actions</th>
            </tr>
          </thead>
          <tbody className="user-table-body">
            {filteredUsers.map((user) => (
              <tr key={user._id} className="user-table-row">
                <td className="user-table-cell">{user.full_name}</td>
                <td className="user-table-cell">{user.email}</td>
                <td className="user-table-cell">{user.address}</td>
                <td className="user-table-cell">{user.phone}</td>
                <td className="user-table-cell user-actions">
                  <button
                    className="user-button edit-button"
                    onClick={() => handleUpdateUser(user._id)}
                  >
                    Update
                  </button>
                  <button
                    className="user-button delete-button"
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
    </div>
  );
}

export default UserAccount;
