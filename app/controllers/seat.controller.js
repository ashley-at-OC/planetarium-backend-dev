const db = require("../models");
const Seat = db.seat;
const Ticket = db.ticket;
const { Op } = db.Sequelize;

// GET /recipeapi/seats
exports.findAll = async (req, res) => {
  try {
    const seats = await Seat.findAll({
      order: [
        ["seatRow", "ASC"],
        ["seatColumn", "ASC"],
      ],
    });

    // Pull just the seatIds of any active tickets, so we can flag those seats.
    const bookedTickets = await Ticket.findAll({
      where: { ticketStatus: { [Op.in]: ["valid", "used"] } },
      attributes: ["seatId"],
    });
    const bookedSeatIds = new Set(bookedTickets.map((t) => t.seatId));

    // Attach the flag to each seat record.
    const result = seats.map((s) => ({
      ...s.toJSON(),
      isBooked: bookedSeatIds.has(s.id), 
    }));// the seat has a ticket with status "valid" or "used""

    res.send(result);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving seats.",
    });
  }
};
