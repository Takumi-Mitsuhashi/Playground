import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import memoRoutes from "./routes/memos.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: "https://playground-rho-green.vercel.app/"
}));

app.use(express.json());

app.use("/memos", memoRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });