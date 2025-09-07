const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sunilmanga60:bangbang-23@sunilm19.ne13j3y.mongodb.net/klicks"
  );
  console.log("connected to DB");
};

module.exports = connectDB;
