import axios from "axios";
import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "../../../css/User_Manager/AdminPage.css";

function StaffAccount() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Add state for search term

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("http://localhost:5000/api/admin");
        setUsers(response.data.admin);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }

    fetchUsers();
  }, []);

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
              <th className="user-table-header">Phone</th>
            </tr>
          </thead>
          <tbody className="user-table-body">
            {filteredUsers.map((user) => (
              <tr key={user._id} className="user-table-row">
                <td className="user-table-cell">{user.full_name}</td>
                <td className="user-table-cell">{user.email}</td>
                <td className="user-table-cell">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StaffAccount;
