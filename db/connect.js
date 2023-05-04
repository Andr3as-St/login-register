import mongoose from "mongoose";
const connectDB = (url) => {
  return mongoose.connect(
    url,
    console.info(`Successfully connected to ${process.env.MONGO_URL}`.cyan.underline)
  );  
};
export default connectDB;
