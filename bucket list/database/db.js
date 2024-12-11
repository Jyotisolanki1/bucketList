const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGO_URL;

mongoose.connect(uri, {}).then((result) => {
  if (result) {
    console.log("Database connected successfully");
  } else {
    console.log("Error connecting to MongoDB");
  }
});
