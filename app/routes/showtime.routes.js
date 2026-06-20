module.exports = (app) => {
    const Showtime = require("../controllers/showtime.controller.js");
    const { authenticateRoute } = require("../authentication/authentication.js");
    var router = require("express").Router();

    // reference recipeStep.routes.js

    // Create a new Showtime for a Show (Show)
    router.post(
        "/shows/:showId/showtimes",
        [authenticateRoute],
        Showtime.create
    );

    // Retrieve all Showtimes for a Show (Show)
    router.get("/shows/:showId/showtimes", Showtime.findAllShowtimesForShow);

    // Retrieve a showtime
    router.get("/showtimes/:id", Showtime.findOne);


    // Update a Showtime with id
    router.put("/shows/:showId/showtimes/:id", Showtime.update);
    // Delete a Showtime with id
    router.delete(
        "/shows/:showId/showtimes/:id", Showtime.delete);

    app.use("/planetariumapi", router);
}