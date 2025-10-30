import mongoose from "mongoose";

const fishModel = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  fishCount: {
    type: Number,
    default: 0,
  },
  castCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Fish", fishModel);
