import express from "express";
import {
  registerUser,
  userLogin,
  adminLogin,
  registerAdmin,
  getAdmins,
  allUsers,
  getUser,
  updateUser,
  removeUser,
} from "../../controllers/User/user_controller.js";

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

export default router;
