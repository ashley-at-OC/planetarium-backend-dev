module.exports = (sequelize, Sequelize) => {
  const Seat = sequelize.define("seat", {
    seatNumber: {
      type: Sequelize.STRING(10),
      allowNull: false,
      unique: true,
    },
    seatRow: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    seatColumn: {
      type: Sequelize.INTEGER,
      allowNull: false, 
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
