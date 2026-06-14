module.exports = (app) => {
  const RecipeShow = require("../controllers/recipeShow.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");

  // Create a new Recipe Show for a Recipe
  router.post(
    "/recipes/:recipeId/recipeShows/",
    [authenticateRoute],
    RecipeShow.create
  );

  // Retrieve all Recipe Shows
  router.get("/recipeShows/", RecipeShow.findAll);

  // Retrieve all Recipe Shows for a Recipe
  router.get(
    "/recipes/:recipeId/recipeShows/",
    RecipeShow.findAllForRecipe
  );

  // Retrieve all Recipe Shows for a Recipe Step and include the shows
  router.get(
    "/recipes/:recipeId/recipeSteps/:recipeStepId/recipeShowsWithShows/",
    RecipeShow.findAllForRecipeStepWithShows
  );

  // Retrieve a single Recipe Show with id
  router.get(
    "/recipes/:recipeId/recipeShows/:id",
    RecipeShow.findOne
  );

  // Update a Recipe Show with id
  router.put(
    "/recipes/:recipeId/recipeShows/:id",
    [authenticateRoute],
    RecipeShow.update
  );

  // Delete a Recipe Show with id
  router.delete(
    "/recipes/:recipeId/recipeShows/:id",
    [authenticateRoute],
    RecipeShow.delete
  );

  // Delete all Recipe Shows
  router.delete(
    "/recipeShows/",
    [authenticateRoute],
    RecipeShow.deleteAll
  );

  app.use("/recipeapi", router);
};
