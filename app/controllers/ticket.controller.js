const db = require("../models");
const User = db.user;
const Ticket = db.ticket;
const Op = db.Sequelize.Op;

// Create and Save a new Ticket
exports.create = async (req, res) => {

    console.log("Request:", req.body);

    // Validate request, making sure data in request actually exists 
    if (!req.body.bookingId) {
        const error = new Error("Booking Id cannot be empty for an ticket!");
        error.statusCode = 400;
        throw error;
    }

    if (!req.body.showtimeId) {
        const error = new Error("Showtime Id cannot be empty for an ticket!");
        error.statusCode = 400;
        throw error;
    }

    if (!req.body.seatId) {
        const error = new Error("Seat Id cannot be empty for an ticket!");
        error.statusCode = 400;
        throw error;
    }
    if (!req.body.ticketType) {
        const error = new Error("Type cannot be empty for an ticket!");
        error.statusCode = 400;
        throw error;
    }

    if (!req.body.ticketStatus) {
        const error = new Error("Status cannot be empty for an ticket!");
        error.statusCode = 400;
        throw error;
    }

    if (!req.body.ticketPrice) {
        const error = new Error("Ticket price cannot be empty for an ticket!");
        error.statusCode = 400;
        throw error;
    }


    if (!req.body.qrCode) {
        const error = new Error("QR code cannot be empty for a ticket!");
        error.statusCode = 400;
        throw error;
    }

    // Create a Ticket using the data from the request
    const ticket = {
        bookingId: req.body.bookingId,
        showtimeId: req.body.showtimeId,
        seatId: req.body.seatId,
        ticketType: req.body.ticketType,
        ticketStatus: req.body.ticketStatus,
        ticketPrice: req.body.ticketPrice,
        emailedAt: req.body.emailedAt,
        scannedAt: req.body.scannedAt,
        qrCode: req.body.qrCode,
    };

    // Save Booking in the database
    try {
        const data = await Ticket.create(ticket);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Ticket.",
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
        const data = await Ticket.findAll({ where: condition, order: [["id", "ASC"]] }); // in ascending order
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving bookings.",
        });
    }
};


exports.findAllTicketsByBookingId = async (req, res) => {
    const bookingId = req.params.bookingId;

    try {
        const data = await Ticket.findAll({
            where: { bookingId },
            order: [["id", "ASC"]],
        });
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while retrieving tickets for a user.",
        });
    }
};



exports.findAllTicketsByShowtimeId = async (req, res) => {
    const showtimeId = req.params.showtimeId;

    try {
        const data = await Ticket.findAll({
            where: { showtimeId },
            order: [["id", "ASC"]],
        });
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while retrieving tickets for a showtime.",
        });
    }
};


// Find a single Ticket with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;

    try {
        const data = await Ticket.findByPk(id);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error retrieving Ticket with id=" + id,
        });
    }
};

// Update a Booking by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;

    try {
        const num = await Ticket.update(req.body, {
            where: { id: id },
        });
        if (num == 1) {
            res.send({
                message: `Booking ${id} was updated successfully.`,
            });
        } else {
            res.send({
                message: `Cannot update Ticket with id=${id}. Maybe Ticket was not found or req.body is empty!`,
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error updating Booking with id=" + id,
        });
    }
};

// Delete a Booking with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        const number = await Ticket.destroy({
            where: { id: id },
        });
        if (number == 1) {
            res.send({
                message: "Booking was deleted successfully!",
            });
        } else {
            res.send({
                message: `Cannot delete Ticket with id=${id}. Maybe Booking was not found!`,
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "Could not delete Booking with id=" + id,
        });
    }
};

// Delete all Bookings from the database.
exports.deleteAll = async (req, res) => {
    try {
        const number = await Ticket.destroy({
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
