const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.ingredient = require("./ingredient.model.js")(sequelize, Sequelize);
db.recipe = require("./recipe.model.js")(sequelize, Sequelize);
db.recipeStep = require("./recipeStep.model.js")(sequelize, Sequelize);
db.recipeIngredient = require("./recipeIngredient.model.js")(
  sequelize,
  Sequelize
);
db.seat = require("./seat.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.show = require("./show.model.js")(sequelize, Sequelize);
db.showtime = require("./showtime.model.js")(sequelize, Sequelize);
db.booking = require("./booking.model.js")(sequelize, Sequelize);
db.ticket = require("./ticket.model.js")(sequelize, Sequelize);
db.paymentTransaction = require("./paymentTransaction.model.js")(sequelize, Sequelize);

// foreign key for session
db.user.hasMany(db.session, {
  as: "session",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.session.belongsTo(db.user, {
  as: "user",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// foreign key for recipe
db.user.hasMany(db.recipe, {
  as: "recipe",
  foreignKey: { allowNull: true },
  onDelete: "CASCADE",
});
db.recipe.belongsTo(db.user, {
  as: "user",
  foreignKey: { allowNull: true },
  onDelete: "CASCADE",
});

// foreign key for recipeStep
db.recipe.hasMany(db.recipeStep, {
  as: "recipeStep",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.recipeStep.belongsTo(db.recipe, {
  as: "recipe",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// foreign keys for recipeIngredient
db.recipeStep.hasMany(db.recipeIngredient, {
  as: "recipeIngredient",
  foreignKey: { allowNull: true },
  onDelete: "CASCADE",
});
db.recipe.hasMany(db.recipeIngredient, {
  as: "recipeIngredient",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.ingredient.hasMany(db.recipeIngredient, {
  as: "recipeIngredient",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.recipeIngredient.belongsTo(db.recipeStep, {
  as: "recipeStep",
  foreignKey: { allowNull: true },
  onDelete: "CASCADE",
});
db.recipeIngredient.belongsTo(db.recipe, {
  as: "recipe",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.recipeIngredient.belongsTo(db.ingredient, {
  as: "ingredient",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// foreign key for planetarium bookings
// Booking depends only on User. Showtime and Seat are attached to Ticket to keep Booking simple.
db.user.hasMany(db.booking, {
  as: "bookings",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.booking.belongsTo(db.user, {
  as: "user",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// Show -> Showtimes
db.show.hasMany(db.showtime, {
  as: "showtimes",
  foreignKey: "ingredientId",
  onDelete: "CASCADE",
});
db.showtime.belongsTo(db.ingredient, {
  as: "ingredient",
  foreignKey: "ingredientId",
  onDelete: "CASCADE",
});

// Booking -> Tickets
db.booking.hasMany(db.ticket, {
  as: "tickets",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.ticket.belongsTo(db.booking, {
  as: "booking",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// Showtime -> Tickets
db.showtime.hasMany(db.ticket, {
  as: "tickets",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.ticket.belongsTo(db.showtime, {
  as: "showtime",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// Seat -> Tickets
db.seat.hasMany(db.ticket, {
  as: "tickets",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.ticket.belongsTo(db.seat, {
  as: "seat",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// Booking -> Payment Transactions
db.booking.hasMany(db.paymentTransaction, {
  as: "paymentTransactions",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.paymentTransaction.belongsTo(db.booking, {
  as: "booking",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

module.exports = db;
