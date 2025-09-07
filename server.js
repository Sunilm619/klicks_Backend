const express = require("express");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const cookieparser = require("cookie-parser");
app.use(express.json());
app.use(cookieparser());
const authroute = require("../backend/routes/auth");
const connectDB = require("../backend/Database/connectDb");

connectDB()
  .then(() => {
    app.listen(5500, () => {
      console.log("listening on 5500");
    });
  })
  .catch((e) => {
    console.log("Error  " + e);
  });

app.use("/api", authroute);
