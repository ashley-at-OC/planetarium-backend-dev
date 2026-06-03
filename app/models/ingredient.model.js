module.exports = (sequelize, Sequelize) => {
  const Ingredient = sequelize.define("ingredient", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    ticketPrice: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    },
    dateTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    attendeeCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });

  return Ingredient;
};
