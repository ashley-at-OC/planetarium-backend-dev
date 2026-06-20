module.exports = (app) => {
    const Ticket = require("../controllers/ticket.controller.js");
    var router = require("express").Router();

    // Create a new Ticket
    router.post("/tickets/", Ticket.create);

    // Retrieve all Tickets with a UserId
    router.get("/tickets/booking/:bookingId", Ticket.findAllTicketsByBookingId);

    // Retrieve all Tickets with a ShowtimeId
    router.get("/tickets/showtime/:showtimeId", Ticket.findAllTicketsByShowtimeId);

    // Retrieve all Ticket
    router.get("/tickets/", Ticket.findAll);

    // Retrieve a single Ticket with ticketId
    router.get("/tickets/:id", Ticket.findOne);

    // Update an Ticket with ticketId
    router.put("/tickets/:id", [authenticateRoute], Ticket.update);

    // Delete an Ticket with ticketId
    router.delete("/tickets/:id", [authenticateRoute], Ticket.delete);

    // Create a new Ticket
    router.delete("/tickets/", [authenticateRoute], Ticket.deleteAll);

    app.use("/recipeapi", router);
};
