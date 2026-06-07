module.exports = (sequelize, Sequelize) => {
  const Booking = sequelize.define("booking", {
    bookingStatus: {
      type: Sequelize.ENUM("pending", "paid", "cancelled", "refunded", "expired"),
      allowNull: false,
      defaultValue: "pending",
    },
    totalPrice: {
      type: Sequelize.DECIMAL(8, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
  });

  return Booking;
};
