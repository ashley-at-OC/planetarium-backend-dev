module.exports = (app) => {
  const Show = require("../controllers/show.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");

  // Create a new Show
  router.post("/shows/", [authenticateRoute], Show.create);

  // Retrieve all Show
  router.get("/shows/", Show.findAll);

  // Retrieve a single Show with showId
  router.get("/shows/:id", Show.findOne);

  // Update an Show with showId
  router.put("/shows/:id", [authenticateRoute], Show.update);

  // Delete an Show with showId
  router.delete("/shows/:id", [authenticateRoute], Show.delete);

  // Create a new Show
  router.delete("/shows/", [authenticateRoute], Show.deleteAll);

  app.use("/recipeapi", router);
};
