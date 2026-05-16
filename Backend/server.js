import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import memoRoutes from "./routes/memos.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({
    
    origin: [
        "http://localhost:5173",
        "https://playground-rho-green.vercel.app"
    ],
    credentials: true,
}));

app.use(express.json());

app.use("/memos", memoRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });