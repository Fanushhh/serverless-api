const express = require("express");
const serverless = require("serverless-http");
const app = express();

const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
// middleware

app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/api/v1/tasks", tasks);



const start = async () => {
  try {
    console.time('DB Connection Time');
    await connectDB(process.env.MONGO_URL);
    console.timeEnd('DB Connection Time');
    app.listen(port, () => {
        console.log(`Server is up on port ${port}`);
      });
  } catch (error) {
    console.log(error);
  }
};
start();

module.exports = app;
module.exports.handler = serverless(app);
