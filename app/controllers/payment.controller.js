const db = require("../models");
const User = db.user;
const Payment = db.paymentPayment; // just shortening it since paymentPayment is a mouthful
const Op = db.Sequelize.Op;

// Create and Save a new Payment
exports.create = async (req, res) => {
    // Validate request, making sure data in request actually exists 


    if (!req.body.bookingId) {
        const error = new Error("Booking Id cannot be empty for an payment!");
        error.statusCode = 400;
        throw error;
    }


    if (!req.body.paymentMethod) {
        const error = new Error("Payment method cannot be empty for an payment!");
        error.statusCode = 400;
        throw error;
    }

    if (!req.body.paymentStatus) {
        const error = new Error("Payment status cannot be empty for an payment!");
        error.statusCode = 400;
        throw error;
    }

    if (!req.body.amount) {
        const error = new Error("Total price cannot be empty for an show!");
        error.statusCode = 400;
        throw error;
    }

    if (!req.body.paidAt) { // is paidAt not the same thing as createdAt...?
        const error = new Error("Total price cannot be empty for an show!");
        error.statusCode = 400;
        throw error;
    }

    // Create a Payment using the data from the request
    const payment = {
        bookingId: req.body.bookingId,
        paymentMethod: req.body.paymentMethod,
        paymentStatus: req.body.paymentStatus,
        amount: req.body.amount,
        paidAt: req.body.paidAt,
    };

    // Save Payment in the database
    try {
        const data = await Payment.create(payment);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Payment.",
        });
    }
};

// Retrieve all Payment from the database.
exports.findAll = async (req, res) => {
    const id = req.query.id;
    var condition = id
        ? {
            id: {
                [Op.like]: `%${id}%`,
            },
        }
        : null;

    try {
        const data = await Show.findAll({ where: condition, order: [["id", "ASC"]] }); // in ascending order
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving shows.",
        });
    }
};


exports.findAllPaymentsByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        const data = await Payment.findAll({
            where: { userId },
            order: [["id", "ASC"]],
        });
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while retrieving payments for a user.",
        });
    }
};

// Find a single Payment with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;

    try {
        const data = await Payment.findByPk(id);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error retrieving Show with id=" + id,
        });
    }
};

// Update a Show by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;

    try {
        const num = await payment.update(req.body, {
            where: { id: id },
        });
        if (num == 1) {
            res.send({
                message: "Payment was updated successfully.",
            });
        } else {
            res.send({
                message: `Cannot update Payment with id=${id}. Maybe Payment was not found or req.body is empty!`,
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error updating Payment with id=" + id,
        });
    }
};

// Delete a Show with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        const number = await Payment.destroy({
            where: { id: id },
        });
        if (number == 1) {
            res.send({
                message: "Payment was deleted successfully!",
            });
        } else {
            res.send({
                message: `Cannot delete Payment with id=${id}. Maybe Payment was not found!`,
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "Could not delete Payment with id=" + id,
        });
    }
};

// Delete all Shows from the database.
exports.deleteAll = async (req, res) => {
    try {
        const number = await Payment.destroy({
            where: {},
            truncate: false,
        });
        res.send({ message: `${number} Payments were deleted successfully!` });
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing all payments.",
        });
    }
};
