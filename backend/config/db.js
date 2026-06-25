import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10, // 👈 max number of sockets in the pool
      minPoolSize: 2,  // 👈 keep a few ready connections warm
      serverSelectionTimeoutMS: 5000, // fail fast if DB is unreachable
      socketTimeoutMS: 45000, // close inactive sockets after 45s
      family: 4, // use IPv4 (avoids some DNS issues)
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Optional: log pool events for debugging
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connection established");
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB connection lost");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB reconnected");
    });

  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;