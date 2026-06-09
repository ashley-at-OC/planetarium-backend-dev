require("dotenv").config();

const db = require("../app/models");
const { getSalt, hashPassword } = require("../app/authentication/crypto");

const args = process.argv.slice(2);
const help = args.includes("--help") || args.includes("-h");
const wipe = args.includes("--wipe") || args.includes("--force") || !args.includes("--no-wipe");

if (help) {
  console.log("Usage: node scripts/init-db.js [--no-wipe] [--help]");
  console.log("  --no-wipe   Preserve existing tables and only sync without dropping them.");
  console.log("  --wipe      Drop and recreate all tables before seeding (default).");
  process.exit(0);
}

const run = async () => {
  try {
    console.log(`Syncing database${wipe ? " (force=true)" : ""}...`);
    await db.sequelize.sync(wipe ? { force: true } : {});
    console.log("Database synced.");

    const salt = await getSalt();
    const passwordHash = await hashPassword("Test1234!", salt);

    const user = await db.user.create({
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      password: passwordHash,
      salt: salt,
    });


    const session = await db.session.create({
      email: user.email,
      userId: user.id,
      expirationDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    console.log("Seed data created:", {
      userId: user.id,
      ingredient1Id: ingredient1.id,
      ingredient2Id: ingredient2.id,
      recipeId: recipe.id,
      step1Id: step1.id,
      step2Id: step2.id,
      recipeIngredientId: recipeIngredient.id,
      sessionId: session.id,
    });

    const foundRecipe = await db.recipe.findByPk(recipe.id, {
      include: [
        {
          model: db.recipeStep,
          as: "recipeStep",
        },
      ],
    });
    console.log("Found recipe with steps:", {
      id: foundRecipe.id,
      name: foundRecipe.name,
      stepCount: foundRecipe.recipeStep.length,
    });

    await db.recipe.update(
      { name: "Pancakes Deluxe" },
      { where: { id: recipe.id } }
    );
    const updatedRecipe = await db.recipe.findByPk(recipe.id);
    console.log("Updated recipe name:", updatedRecipe.name);

    await db.recipeStep.destroy({ where: { id: step2.id } });
    const deletedStep = await db.recipeStep.findByPk(step2.id);
    console.log("Deleted recipe step 2 exists?", !!deletedStep);

    const foundSession = await db.session.findByPk(session.id);
    console.log("Found session:", {
      id: foundSession.id,
      userId: foundSession.userId,
      expirationDate: foundSession.expirationDate,
    });

    console.log("Init + CRUD verification complete.");
    process.exit(0);
  } catch (error) {
    console.error("Init/verify failed:", error);
    process.exit(1);
  }
};

run();
