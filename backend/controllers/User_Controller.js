const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User_Model");
const Admin = require("../models/Admin_model");

// Customer
const registerUser = async (req, res) => {
  const { email, full_name, address, phone, password } = req.body;

  if (!email || !full_name || !address || !phone || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide All Fields" });
  }

  try {
    let userExists = await User.findOne({ email });
    if (userExists)
      return res
        .status(200)
        .json({ success: false, message: "User already exists!" });

    if (phone.length < 10) {
      return res.status(200).json({
        success: false,
        message: "Phone number must contain 10 digits!",
      });
    }

    if (password.length < 8) {
      return res.status(200).json({
        success: false,
        message: "Please enter at least 8 characters as password!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      full_name,
      address,
      phone,
      password: hashedPassword,
    });

    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, name: user.full_name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ success: true, token });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const removeUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "User Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete Failed!" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { full_name, email, address, phone, password } = req.body;

  try {
    let updatedData = { full_name, email, address, phone };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Admin
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign(
      { id: admin._id, name: admin.full_name, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const registerAdmin = async (req, res) => {
  const { email, full_name, phone, password } = req.body;

  if (!email || !full_name || !phone || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide All Fields" });
  }

  try {
    let userExists = await Admin.findOne({ email });
    if (userExists)
      return res
        .status(200)
        .json({ success: false, message: "User already exists!" });

    if (password.length < 8) {
      return res.status(200).json({
        success: false,
        message: "Please enter at least 8 characters as password!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      email,
      full_name,
      phone,
      password: hashedPassword,
    });

    await newAdmin.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getAdmins = async (req, res) => {
  try {
    const admin = await Admin.find();
    res.status(200).json({ success: true, admin });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Export all handlers
module.exports = {
  registerUser,
  userLogin,
  allUsers,
  getUser,
  updateUser,
  removeUser,
  adminLogin,
  registerAdmin,
  getAdmins,
};
