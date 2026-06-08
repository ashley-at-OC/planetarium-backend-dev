module.exports = (sequelize, Sequelize) => {
  const Show = sequelize.define("show", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(8, 2),
      allowNull: false,
    },
    image: {
      type: Sequelize.BLOB("long"),
      allowNull: true,
    },
    durationMinutes: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return Show;
};
