const db = require("../models");
const RecipeShow = db.recipeShow;
const Show = db.show;
const Op = db.Sequelize.Op;

// Create and Save a new RecipeShow
exports.create = async (req, res) => {
  // Validate request
  if (req.body.quantity === undefined) {
    const error = new Error("Quantity cannot be empty for recipe show!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.recipeId === undefined) {
    const error = new Error("Recipe ID cannot be empty for recipe show!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.showId === undefined) {
    const error = new Error(
      "Show ID cannot be empty for recipe show!"
    );
    error.statusCode = 400;
    throw error;
  }

  // Create a RecipeShow
  const recipeShow = {
    quantity: req.body.quantity,
    recipeId: req.body.recipeId,
    recipeStepId: req.body.recipeStepId ? req.body.recipeStepId : null,
    showId: req.body.showId,
  };
  // Save RecipeShow in the database
  try {
    const data = await RecipeShow.create(recipeShow);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        "Some error occurred while creating the RecipeShow.",
    });
  }
};

// Retrieve all RecipeShows from the database.
exports.findAll = async (req, res) => {
  const recipeShowId = req.query.recipeShowId;
  var condition = recipeShowId
    ? {
      id: {
        [Op.like]: `%${recipeShowId}%`,
      },
    }
    : null;

  try {
    const data = await RecipeShow.findAll({ where: condition });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        "Some error occurred while retrieving recipeShows.",
    });
  }
};

exports.findAllForRecipe = async (req, res) => {
  const recipeId = req.params.recipeId;
  try {
    const data = await RecipeShow.findAll({
      where: { recipeId: recipeId },
      include: [
        {
          model: Show,
          as: "show",
          required: true,
        },
      ],
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        "Some error occurred while retrieving recipeShows for a recipe.",
    });
  }
};

// Find all RecipeShows for a recipe step and include the shows
exports.findAllForRecipeStepWithShows = async (req, res) => {
  const recipeStepId = req.params.recipeStepId;
  try {
    const data = await RecipeShow.findAll({
      where: { recipeStepId: recipeStepId },
      include: [
        {
          model: Show,
          as: "show",
          required: true,
        },
      ],
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        "Some error occurred while retrieving recipeShows for a recipe step.",
    });
  }
};

// Find a single RecipeShow with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await RecipeShow.findByPk(id);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Error retrieving RecipeShow with id=" + id,
    });
  }
};

// Update a RecipeShow by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const number = await RecipeShow.update(req.body, {
      where: { id: id },
    });
    if (number == 1) {
      res.send({
        message: "RecipeShow was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update RecipeShow with id=${id}. Maybe RecipeShow was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error updating RecipeShow with id=" + id,
    });
  }
};

// Delete a RecipeShow with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const number = await RecipeShow.destroy({
      where: { id: id },
    });
    if (number == 1) {
      res.send({
        message: "RecipeShow was deleted successfully!",
      });
    } else {
      res.send({
        message: `Cannot delete RecipeShow with id=${id}. Maybe RecipeShow was not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Could not delete RecipeShow with id=" + id,
    });
  }
};

// Delete all RecipeShows from the database.
exports.deleteAll = async (req, res) => {
  try {
    const number = await RecipeShow.destroy({
      where: {},
      truncate: false,
    });
    res.send({
      message: `${number} RecipeShows were deleted successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        "Some error occurred while removing all recipeShows.",
    });
  }
};
