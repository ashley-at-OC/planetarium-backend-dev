module.exports = (app) => {
    const Showtime = require("../controllers/showtime.controller.js");
    const { authenticateRoute } = require("../authentication/authentication.js");
    var router = require("express").Router();

    // reference recipeStep.routes.js

    // Create a new Showtime for a Show (Ingredient)
    router.post(
        "/ingredients/:ingredientId/showtimes",
        [authenticateRoute],
        Showtime.create
    );

    // Retrieve all Showtimes for a Show (Ingredient)
    router.get("/ingredients/:ingredientId/showtimes", Showtime.findAllShowtimesForShow);


    // Update a Showtime with id
    router.put("/ingredients/:ingredientId/showtimes/:id", Showtime.update);
    // Delete a Showtime with id
    router.delete(
        "/ingredients/:ingredientId/showtimes/:id", Showtime.delete);

    app.use("/recipeapi", router);
}