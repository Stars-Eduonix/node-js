import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = 5000;

// import all models 
import User from "./models/user.js";


// import all routes
import authRouter from "./routes/auth.js";

// connect to database: 
mongoose.connect("mongodb://localhost:27017/authEduonix")
.then(() => {
    console.log("Connected to database");
})
.catch((err) => {
    console.log("Error connecting to database", err);
})

// middleware
app.use(cors());
app.use(express.json());

// routes middleware
app.use("/api/auth/", authRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})