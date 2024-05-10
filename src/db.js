require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected on port ", process.env.PORT);
  } catch (err) {
    console.log("Cannot connect to database", err);
    process.exit(1)
  }
};

module.exports = connectDB