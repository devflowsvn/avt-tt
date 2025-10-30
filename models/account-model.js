import mongoose from "mongoose";

const accountSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isUsed: {
      type: Boolean,
      default: 0,
    },
  },
  {
    timestamp: true,
  }
);

export default mongoose.model("Account", accountSchema);
