module.exports = (sequelize, Sequelize) => {
  const Ingredient = sequelize.define("ingredient", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT, // for longer strings
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    image: {
      type: Sequelize.BLOB("long"), // deal with uploading images later
      allowNull: true, // to test without images
    },
    duration: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },

  });
  return Ingredient;
};
