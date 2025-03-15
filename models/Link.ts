import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    desc: {
      type: String,
    },
    originalUrl: { 
      type: String, 
      required: true 
    },
    shortId: { 
      type: String, 
      required: true, 
      unique: true 
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    },
  },
  { timestamps: true }
);

export default mongoose.models.Link || mongoose.model("Link", LinkSchema);

