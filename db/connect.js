import mongoose from "mongoose";

const connectDB = async (url) => {
  await mongoose.connect(url);
  console.info("Successfully connected to MongoDB".cyan.underline);
};

export default connectDB;
