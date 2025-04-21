import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Failed to connect MongoDB");
  }
};

export default connectMongoDB;
