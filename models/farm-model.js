import mongoose from "mongoose";

const farmSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  serverAddress: {
    type: String,
    required: true,
  },
  isOpenedChest: {
    type: Boolean,
    required: true,
  },
  isOpenedAnimals: {
    type: Boolean,
    required: true,
  },
  isOpenedPlant: {
    type: Boolean,
    required: true,
  },

  seedAt: {
    type: Date,
    default: Date.now, // mặc định là thời điểm tạo user
  },
});

export default mongoose.model("Farm", farmSchema);
