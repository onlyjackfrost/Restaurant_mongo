const mongoose = require("mongoose");
const Restaurant = require("../restaurant");
const src = require("../../restaurant.json");

mongoose.connect("mongodb://localhost/restaurant", { useNewUrlParser: true });
const data = src.results;
const db = mongoose.connection;

db.on("error", err => {
  console.error(err);
});

db.on("open", () => {
  data.map(ele => {
    Restaurant.create({
      name: ele.name,
      name_en: ele.name_en,
      category: ele.category,
      image: ele.image,
      location: ele.location,
      phone: ele.phone,
      google_map: ele.google_map,
      rating: ele.rating,
      description: ele.description
    });
  });
  console.log("insert restaurant done");
});
