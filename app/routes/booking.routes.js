module.exports = (app) => {
    const Booking = require("../controllers/booking.controller.js");
    var router = require("express").Router();

    // Create a new Booking
    router.post("/bookings/", [authenticateRoute], Booking.create);

    // Retrieve all Bookings with a UserId
    router.get("/bookings/user/:userId", Booking.findAllBookingsByUserId);

    // Retrieve all Booking
    router.get("/bookings/", Booking.findAll);

    // Retrieve a single Booking with bookingId
    router.get("/bookings/:id", Booking.findOne);

    // Update an Booking with bookingId
    router.put("/bookings/:id", [authenticateRoute], Booking.update);

    // Delete an Booking with bookingId
    router.delete("/bookings/:id", [authenticateRoute], Booking.delete);

    // Create a new Booking
    router.delete("/bookings/", [authenticateRoute], Booking.deleteAll);

    //send email confirmation
    router.post("/bookings/:bookingId/email-confirmation", Booking.emailConfirmation);

    app.use("/planetariumapi", router);
};
