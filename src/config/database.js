import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

/**
 * Connect to the MongoDB database
 */
export const connectToDatabase = async () => {
  try {
    const connectionString = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.xzqlcpm.mongodb.net/${process.env.MONGO_DB_NAME}`;
    await mongoose.connect(connectionString);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(`Failed to connect to MongoDB: ${error.message}`);
  }
};
