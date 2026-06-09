const db = require("../models");
const Showtime = db.showtime;
const Ingredient = db.ingredient; // shows for now
const Op = db.Sequelize.Op;

// referencing showtime.controller.js because of its dependency on Recipe

// Create and Save a new Showtime
exports.create = async (req, res) => {

    console.log(req);
    // Validate request
    if (req.body.ingredientId === undefined) {
        const error = new Error("Ingredient ID cannot be empty for showtime!");
        error.statusCode = 400;
        throw error;
    }
    else if (req.body.startDateTime === undefined) {
        const error = new Error("Start DateTime cannot be empty for showtime!");
        error.statusCode = 400;
        throw error;
    } else if (req.body.endDateTime === undefined) {
        const error = new Error("End DateTime cannot be empty for showtime!");
        error.statusCode = 400;
        throw error;
    } else if (req.body.attendeeCount === undefined) {
        const error = new Error("Attendee Count cannot be empty for showtime!");
        error.statusCode = 400;
        throw error;
    }
    else if (req.body.isActive === undefined) {
        const error = new Error("Is Active cannot be empty for showtime!");
        error.statusCode = 400;
        throw error;
    }

    // Create a Showtime
    const showtime = {
        ingredientId: req.params.ingredientId,
        startDateTime: req.body.startDateTime,
        endDateTime: req.body.startDateTime,
        attendeeCount: req.body.attendeeCount,
        isActive: req.body.isActive,
    };

    // Save Showtime in the database
    try {
        const data = await Showtime.create(showtime);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Showtime.",
        });
    }
};

// Retrieve all Showtimes from the database.
exports.findAll = async (req, res) => {
    const showtimeId = req.query.showtimeId;
    var condition = showtimeId
        ? {
            id: {
                [Op.like]: `%${showtimeId}%`,
            },
        }
        : null;

    try {
        const data = await showtimeId.findAll({ where: condition });
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving showtimeId.",
        });
    }
};

// Retrieve all showtimes for a show
exports.findAllShowtimesForShow = async (req, res) => {
    const ingredientId = req.params.ingredientId;

    try {
        const data = await Showtime.findAll({
            where: { ingredientId },
            order: [["startDateTime", "ASC"]],
        });
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while retrieving showtimes for a recipe.",
        });
    }
};


// Find a single Showtime with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Showtime.findByPk(id);
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find Showtime with id=${id}.`,
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error retrieving Showtime with id=" + id,
        });
    }
};

// Update a Showtime by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        const number = await Showtime.update(req.body, {
            where: { id: id },
        });
        if (number == 1) {
            res.send({
                message: "Showtime was updated successfully.",
            });
        } else {
            res.send({
                message: `Cannot update Showtime with id=${id}. Maybe Showtime was not found or req.body is empty!`,
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error updating Showtime with id=" + id,
        });
    }
};

// Delete a Showtime with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const number = await Showtime.destroy({
            where: { id: id },
        });
        if (number == 1) {
            res.send({
                message: "Showtime was deleted successfully!",
            });
        } else {
            res.send({
                message: `Cannot delete Showtime with id=${id}. Maybe Showtime was not found!`,
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "Could not delete Showtime with id=" + id,
        });
    }
};

// Delete all Showtimes from the database.
exports.deleteAll = async (req, res) => {
    try {
        const number = await Showtime.destroy({
            where: {},
            truncate: false,
        });
        res.send({ message: `${number} Showtimes were deleted successfully!` });
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing all showtimes.",
        });
    }
};
