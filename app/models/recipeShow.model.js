module.exports = (sequelize, Sequelize) => {
  const RecipeShow = sequelize.define("recipeShow", {
    quantity: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    recipeStepId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  });
  return RecipeShow;
};
