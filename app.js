const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/files", (req, res) => {
  res.render("files");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/folder/:id", (req, res) => {
  res.send("file names")
})

app.get("/download/:id", (req, res) => {
  res.send("file downloaded")
})

app.get("/dashboard", (req, res) => {
  res.render("dashboard/add-file");
});
app.get("/dashboard/add-user", (req, res) => {
  res.render("dashboard/add-user");
});
app.get("/dashboard/add-folder", (req, res) => {
  res.render("dashboard/add-folder");
});

// const viewRouter = require("./routes/viewRoute");
// app.use("/", viewRouter);


module.exports = app;
