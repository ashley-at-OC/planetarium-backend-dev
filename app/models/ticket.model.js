module.exports = (sequelize, Sequelize) => {
  const Ticket = sequelize.define("ticket", {
    qrCode: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    ticketStatus: {
      type: Sequelize.ENUM("valid", "used", "cancelled"),
      allowNull: false,
      defaultValue: "valid",
    },
    ticketType: {
      type: Sequelize.ENUM("adult", "child_under_8"),
      allowNull: false,
      defaultValue: "adult",
    },
    ticketPrice: {
      type: Sequelize.DECIMAL(8, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
    emailedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    scannedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  });

  return Ticket;
};
