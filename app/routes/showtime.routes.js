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


    app.use("/recipeapi", router);
}
