module.exports = (app) => {
    const Transaction = require("../controllers/payment.controller.js");
    const { authenticateRoute } = require("../authentication/authentication.js");
    var router = require("express").Router();

    // Create a new Transaction
    router.post("/transactions/", Transaction.create);

    // Retrieve all Users
    router.get("/transactions/", Transaction.findAll);

    // Retrieve a single User with id
    router.get("/transactions/:id", Transaction.findOne);

    // Update a User with id
    router.put("/transactions/:id", [authenticateRoute], Transaction.update);

    // Delete a User with id
    router.delete("/transactions/:id", [authenticateRoute], Transaction.delete);

    // Delete all User
    router.delete("/transactions/", [authenticateRoute], Transaction.deleteAll);

    app.use("/recipeapi", router);
};
