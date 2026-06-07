module.exports = (sequelize, Sequelize) => {
  const Seat = sequelize.define("seat", {
    seatNumber: {
      type: Sequelize.STRING(10),
      allowNull: false,
      unique: true,
    },
    seatType: {
      type: Sequelize.ENUM("regular", "handicap"),
      allowNull: false,
      defaultValue: "regular",
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });

  return Seat;
};
