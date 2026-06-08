const db = require("../models");
const Seat = db.seat;

// GET /recipeapi/seats
// Fetch all seats, sorted for seat-map rendering.
exports.findAll = async (req, res) => {
  try {
    const data = await Seat.findAll({
      order: [
        ["seatRow", "ASC"],
        ["seatColumn", "ASC"],
      ],
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving seats.",
    });
  }
};
