import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userAuth from "./routes/User/user_routes.js";
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // Allow JSON parsing

//routes
app.use("/api", userAuth);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
