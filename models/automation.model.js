import mongoose from "mongoose";

const automationSchema = new mongoose.Schema(
  {
    autoKey: {
      type: String,
      required: true,
      trim: true,
    },
    fishMap: {
      type: Number, // 👉 nếu đây là mã bản đồ (tên map) thì nên là string, không phải number
      required: true,
    },
    toFarmTime: {
      type: Number, // Unix timestamp (ms)
      required: true,
    },
    chatContent: {
      type: String,
      required: true,
      trim: true,
    },
    dinamondMode: {
      type: String,
      enum: ["sell", "save", "remove"],
      default: "sell",
    },
    giftsCode: {
      type: [String],
      default: [],
    },
    position: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
    fishBait: {
      type: Number,
      required: true,
      min: 0,
    },
    rodID: {
      type: Number, // 👉 thường rodID là chuỗi, ví dụ “rod_basic_01”
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.models.Automation ||
  mongoose.model("Automation", automationSchema);
