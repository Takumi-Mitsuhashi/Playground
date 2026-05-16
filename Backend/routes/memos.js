import express from "express";
import Memo from "../models/Memo.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { content } = req.body;

    const memo = new Memo({
      content,
    });

    await memo.save();

    res.status(201).json({
      success: true,
      memo,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "保存失敗",
    });
  }
});

export default router;