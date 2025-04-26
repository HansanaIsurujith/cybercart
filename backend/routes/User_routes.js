const express = require("express");
const {
  registerUser,
  userLogin,
  adminLogin,
  registerAdmin,
  getAdmins,
  allUsers,
  getUser,
  updateUser,
  removeUser,
} = require("../controllers/User_Controller");

const router = express.Router();

router.post("/sign-up", registerUser);
router.post("/login", userLogin);
router.get("/users", allUsers);
router.get("/user/:id", getUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", removeUser);

router.post("/adminLogin", adminLogin);
router.post("/adminSignUp", registerAdmin);
router.get("/admin", getAdmins);

module.exports = router;
