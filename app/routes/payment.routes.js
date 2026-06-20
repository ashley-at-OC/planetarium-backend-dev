module.exports = (app) => {
    const Payment = require("../controllers/payment.controller.js");
    var router = require("express").Router();

    // Create a new Payment
    router.post("/payments/", Payment.create);

    // Retrieve all Payments with a BookingId
    router.get("/bookings/:bookingId/payments/", Payment.findAllPaymentsByBookingId);

    // Retrieve all Payment
    router.get("/payments/", Payment.findAll);

    // Retrieve a single Payment with paymentId
    router.get("/payments/:id", Payment.findOne);

    // Update an Payment with paymentId
    router.put("/payments/:id", [authenticateRoute], Payment.update);

    // Delete an Payment with paymentId
    router.delete("/payments/:id", [authenticateRoute], Payment.delete);

    // Create a new Payment
    router.delete("/payments/", [authenticateRoute], Payment.deleteAll);

    app.use("/planetariumapi", router);
};
