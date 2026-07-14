const mongoose = require("mongoose");

async function connectToDb() {
    try {
        await mongoose.connect(process.env.DB_CONNECT);
        console.log("✅ Database Connected Successfully");
    } catch (err) {
        console.error("❌ Database Connection Failed:", err.message);
        process.exit(1); // Stop the server if DB connection fails
    }
}

module.exports = connectToDb;