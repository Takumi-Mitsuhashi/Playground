import mongoose from "mongoose";

const MemoSchema = new mongoose.Schema(
  
      {
    title: {
      type: String,
      default: "Untitled",
    },
  
    
    content: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Memo", MemoSchema);