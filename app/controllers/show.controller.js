const db = require("../models");
const Show = db.show;
const Op = db.Sequelize.Op;

// Create and Save a new Show
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    const error = new Error("Name cannot be empty for an show!");
    error.statusCode = 400;
    throw error;
  }

  if (!req.body.description) {
    const error = new Error("Description cannot be empty for an show!");
    error.statusCode = 400;
    throw error;
  }

  if (req.body.price === undefined) {
    const error = new Error("Price cannot be empty for an show!");
    error.statusCode = 400;
    throw error;
  }

  if (req.body.durationMinutes === undefined) {
    const error = new Error("Duration cannot be empty for an show!");
    error.statusCode = 400;
    throw error;
  }

  // image is optional
  // id, createdAt, and updatedAt are handled by Sequelize



  // Create a Show
  const show = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    durationMinutes: req.body.durationMinutes,
    imageURL: req.body.imageURL,
  };
  // Save Show in the database
  try {
    const data = await Show.create(show);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Show.",
    });
  }
};

// Retrieve all Shows from the database.
exports.findAll = async (req, res) => {
  const showId = req.query.showId;
  var condition = showId
    ? {
      id: {
        [Op.like]: `%${showId}%`,
      },
    }
    : null;

  try {
    const data = await Show.findAll({ where: condition, order: [["name", "ASC"]] }); // in ascending order
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving shows.",
    });
  }
};

// Find a single Show with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Show.findByPk(id);
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
    const num = await Show.update(req.body, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        message: "Show was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update Show with id=${id}. Maybe Show was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error updating Show with id=" + id,
    });
  }
};

// Delete a Show with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const number = await Show.destroy({
      where: { id: id },
    });
    if (number == 1) {
      res.send({
        message: "Show was deleted successfully!",
      });
    } else {
      res.send({
        message: `Cannot delete Show with id=${id}. Maybe Show was not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Could not delete Show with id=" + id,
    });
  }
};

// Delete all Shows from the database.
exports.deleteAll = async (req, res) => {
  try {
    const number = await Show.destroy({
      where: {},
      truncate: false,
    });
    res.send({ message: `${number} Shows were deleted successfully!` });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all shows.",
    });
  }
};
