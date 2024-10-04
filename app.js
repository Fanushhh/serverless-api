const express = require("express");
const serverless = require("serverless-http");
const mongoose = require("mongoose");
const app = express();

const tasks = require("./routes/tasks");
require("dotenv").config();

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/tasks", tasks);

// Lazy Database Connection
let isConnected = false; // Track database connection state

const connectDB = async () => {
  if (isConnected) {
    return;
  }
  try {
    console.time('DB Connection Time');
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.timeEnd('DB Connection Time');
    isConnected = true;
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error connecting to the database", error);
    throw new Error("Database connection failed");
  }
};

// Wrap the handler to ensure DB connection is made before handling requests
app.use(async (req, res, next) => {
  if (!isConnected) {
    await connectDB(); // Ensure DB is connected before proceeding with the request
  }
  next();
});

// Export the serverless function handler
module.exports = app;
module.exports.handler = serverless(app);
