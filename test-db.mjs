import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/sowjanya_dental";

async function testConnection() {
  try {
    console.log("Connecting to:", MONGODB_URI);
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log("SUCCESS: Connected to MongoDB");
    process.exit(0);
  } catch (err) {
    console.error("FAILURE: Could not connect to MongoDB:", err.message);
    process.exit(1);
  }
}

testConnection();
