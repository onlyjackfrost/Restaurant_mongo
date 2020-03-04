const express = require("express");
const hdbars = require("express-handlebars");
const mongoose = require("mongoose");
const apiRouter = require("./route/apiRouter");
const app = express();
const port = 3000;

// Mongo DB ======================
mongoose.connect("mongodb://localhost/restaurant", { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", err => {
  console.error(err);
});

db.on("open", () => {
  console.log("mongoDB connected...");
  app.listen(port, () => {
    console.log("listening on port : ", port);
  });
});

// express setting
app.engine("handlebars", hdbars({ defaultLayout: "main.handlebars" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));

// api router
app.use(apiRouter);
