const db = require("../models");
const User = db.user;
const Booking = db.booking;
const Op = db.Sequelize.Op;

// Create and Save a new Booking
exports.create = async (req, res) => {
    // Validate request, making sure data in request actually exists 
    if (!req.body.userId) {
        const error = new Error("UserId cannot be empty for an booking!");
        error.statusCode = 400;
        throw error;
    }

    if (!req.body.bookingStatus) {
        const error = new Error("Status cannot be empty for an booking!");
        error.statusCode = 400;
        throw error;
    }

    if (!req.body.totalPrice) {
        const error = new Error("Total price cannot be empty for an show!");
        error.statusCode = 400;
        throw error;
    }

    // Create a Booking using the data from the request
    const booking = {
        userId: req.body.userId,
        bookingStatus: req.body.bookingStatus,
        totalPrice: req.body.totalPrice,
    };

    // Save Booking in the database
    try {
        const data = await Booking.create(booking);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Booking.",
        });
    }
};

// Retrieve all Booking from the database.
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


exports.findAllBookingsByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        const data = await Booking.findAll({
            where: { userId },
            order: [["id", "ASC"]],
        });
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while retrieving bookings for a user.",
        });
    }
};

// Find a single Booking with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;

    try {
        const data = await Booking.findByPk(id);
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
        const num = await booking.update(req.body, {
            where: { id: id },
        });
        if (num == 1) {
            res.send({
                message: "Booking was updated successfully.",
            });
        } else {
            res.send({
                message: `Cannot update Booking with id=${id}. Maybe Booking was not found or req.body is empty!`,
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error updating Booking with id=" + id,
        });
    }
};

// Delete a Show with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        const number = await Booking.destroy({
            where: { id: id },
        });
        if (number == 1) {
            res.send({
                message: "Booking was deleted successfully!",
            });
        } else {
            res.send({
                message: `Cannot delete Booking with id=${id}. Maybe Booking was not found!`,
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "Could not delete Booking with id=" + id,
        });
    }
};

// Delete all Shows from the database.
exports.deleteAll = async (req, res) => {
    try {
        const number = await Booking.destroy({
            where: {},
            truncate: false,
        });
        res.send({ message: `${number} Bookings were deleted successfully!` });
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing all bookings.",
        });
    }
};
