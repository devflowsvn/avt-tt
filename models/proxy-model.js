import mongoose from "mongoose";

const proxySchema = mongoose.Schema({
  host: {
    type: String,
    required: true,
  },
  port: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  usedCount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Proxy", proxySchema);
