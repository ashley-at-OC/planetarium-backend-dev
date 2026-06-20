// Routes for seat endpoints. Endpoints are /planetariumapi/seats.
module.exports = (app) => {
  const Seat = require("../controllers/seat.controller.js");
  var router = require("express").Router();

  // Returns the full seat list.
  router.get("/seats", Seat.findAll);

  app.use("/planetariumapi", router);
};
