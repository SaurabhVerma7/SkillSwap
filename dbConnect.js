const mongoose = require('mongoose');

const connection = {};
const DB_NAME = "skillswap";

async function dbConnect() {
  if (connection.isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000
      }
    );
    
    connection.isConnected = db.connections[0].readyState;
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

module.exports = dbConnect;