module.exports = (app) => {
    const Payment = require("../controllers/payment.controller.js");
    const { authenticateRoute } = require("../authentication/authentication.js");
    var router = require("express").Router();

    // Create a new Payment
    router.post("/payments/", Payment.create);

    // Retrieve all Users
    router.get("/payments/", Payment.findAll);

    // Retrieve a single User with id
    router.get("/payments/:id", Payment.findOne);

    // Update a User with id
    router.put("/payments/:id", [authenticateRoute], Payment.update);

    // Delete a User with id
    router.delete("/payments/:id", [authenticateRoute], Payment.delete);

    // Delete all User
    router.delete("/payments/", [authenticateRoute], Payment.deleteAll);

    app.use("/recipeapi", router);
};
