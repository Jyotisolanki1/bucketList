const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
require("./database/db.js");

const app = express();
dotenv.config();

app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.static(__dirname + "/public/"));
app.use(express.urlencoded({ extended: true }));
// ---- SERVE APPLICATION PATHS ---- //

///////////////////////////////   for react build Start  /////////////////////////////////////////
app.all("/bucketlist/", function (req, res) {
  res
    .status(200)
    .sendFile(path.join(__dirname, "public", "bucketlist", "index.html"));
});
app.all("/bucketlist/*", function (req, res) {
  res
    .status(200)
    .sendFile(path.join(__dirname, "public", "bucketlist", "index.html"));
});

app.all("/client/", function (req, res) {
  res
    .status(200)
    .sendFile(path.join(__dirname, "public", "client", "index.html"));
});
app.all("/client/*", function (req, res) {
  res
    .status(200)
    .sendFile(path.join(__dirname, "public", "client", "index.html"));
});
///////////////////////////////   for react build End  /////////////////////////////////////////

//authetication
const JWTAuthantication = require("./middlewares/authentication");
app.use(JWTAuthantication);

//routes
const userRoutes = require("./routes/userRoute");
const adminRoutes = require("./routes/adminRoute");
const clientRoutes = require("./routes/clientRoute");

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/clientapi", clientRoutes);

//env variables
const port = process.env.PORT;
console.log();
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
