require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./app/models");

const PORT = process.env.PORT || 3200;

const allowedOrigins = [
  "http://localhost:8081",
  "http://localhost:5173",
  "http://ec2-54-227-117-253.compute-1.amazonaws.com",
  "http://ec2-54-227-117-253.compute-1.amazonaws.com:3200",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the planetarium backend." });
});

require("./app/routes/auth.routes.js")(app);
require("./app/routes/show.routes")(app);
require("./app/routes/recipe.routes")(app);
require("./app/routes/recipeStep.routes")(app);
require("./app/routes/recipeShow.routes")(app);
require("./app/routes/seat.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/showtime.routes.js")(app);
require("./app/routes/booking.routes.js")(app);
require("./app/routes/payment.routes.js")(app);
require("./app/routes/ticket.routes.js")(app);

const startServer = async () => {
  try {
    await db.sequelize.sync({ alter: process.env.DB_ALTER === "true" });
    console.log("Database synced.");

    if (process.env.NODE_ENV !== "test") {
      app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server is running on port ${PORT}.`);
      });
    }
  } catch (err) {
    console.error("DB sync failed:", err);
    process.exit(1);
  }
};

startServer();

module.exports = app;