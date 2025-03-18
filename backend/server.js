import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // Allow JSON parsing

const uri = 'mongodb+srv://root:1234@cybercart.jmpiy.mongodb.net/?retryWrites=true&w=majority&appName=cybercart'

const connect = async () => {
    try{
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    }
    catch(erroe){
        console.log('MongoDB error: ', error);
    }
};

connect();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
