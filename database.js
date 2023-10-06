const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Initialize the database with a table for job logs
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS jobLogs (jobNumber TEXT, totalLights INTEGER, lightType TEXT)");
});

module.exports = db;
