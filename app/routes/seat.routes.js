// Routes for Seat endpoints. Mounted at /recipeapi endpoints are /recipeapi/seats.
module.exports = (app) => {
  const Seat = require("../controllers/seat.controller.js");
  var router = require("express").Router();

  // Returns the full seat list.
  router.get("/seats", Seat.findAll);

  app.use("/recipeapi", router);
};
