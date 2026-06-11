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


    // Seed 60 seats: 6 rows (A-F) x 10 columns. A1, A2, A9, A10 are handicap.
    const rows = ["A", "B", "C", "D", "E", "F"];
    const handicapSeats = new Set(["A1", "A2", "A9", "A10"]);
    const seatsToCreate = [];
    for (const row of rows) {
      for (let col = 1; col <= 10; col++) {
        const seatNumber = `${row}${col}`;
        seatsToCreate.push({
          seatNumber,
          seatRow: row,
          seatColumn: col,
          seatType: handicapSeats.has(seatNumber) ? "handicap" : "regular",
        });
      }
    }
    const seats = await db.seat.bulkCreate(seatsToCreate);
    console.log(`Seeded ${seats.length} seats.`);

    const session = await db.session.create({
      email: user.email,
      userId: user.id,
      expirationDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    console.log("Seed data created:", {
      userId: user.id,
      sessionId: session.id,
      seatCount: seats.length,
    });

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
