const db = require("../models");
const Booking = db.booking;
const Payment = db.paymentTransaction;
const Op = db.Sequelize.Op;

// Create and Save a new Payment
exports.create = async (req, res) => {
    // Validate request, making sure data in request actually exists 
    if (!req.body.bookingId) {
        const error = new Error("BookingId cannot be empty for an payment!");
        error.statusCode = 400;
        throw error;
    }

    if (!req.body.paymentStatus) {
        const error = new Error("Payment Status cannot be empty for an payment!");
        error.statusCode = 400;
        throw error;
    }
    if (!req.body.paymentMethod) {
        const error = new Error("Payment Method cannot be empty for an show!");
        error.statusCode = 400;
        throw error;
    }

    if (!req.body.amount) {
        const error = new Error("Amount cannot be empty for an show!");
        error.statusCode = 400;
        throw error;
    }

    if (!req.body.paidAt) {
        const error = new Error("Paid at cannot be empty for an show!");
        error.statusCode = 400;
        throw error;
    }

    // Create a Payment using the data from the request
    const payment = {
        bookingId: req.body.bookingId,
        paymentStatus: req.body.paymentStatus,
        paymentMethod: req.body.paymentMethod,
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


exports.findAllPaymentsByBookingId = async (req, res) => {
    const bookingId = req.params.bookingId;

    try {
        const data = await Payment.findAll({
            where: { bookingId },
            order: [["id", "ASC"]],
        });
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while retrieving payments for a booking.",
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
