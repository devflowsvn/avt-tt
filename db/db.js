import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connect to db successfully");
  } catch (error) {
    console.log(error);
  }
};
