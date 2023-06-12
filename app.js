const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "static")));

const User = require("./models/userModel")
app.get("/add-admin", async(req, res) =>{
  const admin = await User.create({
    name: "ADMIN NAME",
    username: "admin",
    password: "12345678",
    role: 'admin'
  })
})

const viewRouter = require("./routes/viewRoute");
app.use("/", viewRouter);
const apiRouter = require("./routes/apiRoute");
app.use("/api/", apiRouter);


module.exports = app;
