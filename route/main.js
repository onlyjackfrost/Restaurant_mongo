const express = require("express");
const Restaurant = require("../model/restaurant");
const main = express.Router();

main.post("/restaurants/:restaurantId/delete", async (req, res) => {
  Restaurant.findById(req.params.restaurantId, (err, restaurant) => {
    if (err) return console.error(err);
    restaurant.remove(err => {
      if (err) return console.error(err);
      return res.redirect("/");
    });
  });
  //   const restaurant = await Restaurant.findById(req.params.restaurantId).lean();
  //   await restaurant.remove();
  //   res.redirect("/");
});
main.post("/restaurants/:restaurantId/edit", async (req, res) => {
  try {
    const body = req.body;
    let restaurant = await Restaurant.findById(req.params.restaurantId);
    // restaurant = { ...restaurant, ...body };
    restaurant.name = body.name;
    restaurant.name_en = body.name_en;
    restaurant.location = body.location;
    restaurant.google_map = body.google_map;
    restaurant.image = body.image;
    restaurant.phone = body.phone;
    restaurant.category = body.category;
    restaurant.rating = body.rating;
    restaurant.description = body.description;
    await restaurant.save();
    res.redirect(`/restaurant/${req.params.restaurantId}`);
  } catch (err) {
    console.error(err);
  }
});

main.post("/restaurants", async (req, res) => {
  try {
    const body = req.body;
    const restaurant = new Restaurant({
      name: body.name,
      name_en: body.name_en,
      location: body.location,
      google_map: body.google_map,
      image: body.image,
      phone: body.phone,
      category: body.category,
      rating: body.rating,
      description: body.description
    });
    await restaurant.save();
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
});

main.get("/new", (req, res) => {
  res.render("new");
});

main.get("/search", async (req, res) => {
  try {
    const { keyword } = req.query;
    const restaurants = await Restaurant.find().lean();
    const result = restaurants.filter(restaurant => {
      return restaurant.name.toLowerCase().includes(keyword.toLowerCase());
    });
    res.render("index", { restaurants: result, keyword });
  } catch (err) {
    console.error(err);
  }
});

main.get("/restaurants/:restaurantId/edit", async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const restaurant = await Restaurant.findById(restaurantId).lean();
    return res.render("edit", { restaurant });
  } catch (err) {
    console.error(err);
  }
});

main.get("/restaurants/:restaurantId", async (req, res) => {
  const { restaurantId } = req.params;
  const restaurant = await Restaurant.findById(restaurantId).lean();
  res.render("detail", { restaurant });
});

main.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find().lean();
    res.render("index", { restaurants });
  } catch (err) {
    console.error(err);
  }
});
module.exports = main;
