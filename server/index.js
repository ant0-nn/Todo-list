import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth.js";
import taskRoute from "./routes/task.js";
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/tasks", taskRoute);


const PORT = process.env.PORT;
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

const start = async () => {
    try {
        mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.9lyz0je.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
        )
        app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start()