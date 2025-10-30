import mongoose from "mongoose";

const animalSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  takeCareAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Animal", animalSchema);
