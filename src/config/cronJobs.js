const cron = require("node-cron");
const { backupMongoDB, backupMySQL } = require("../backup/backupService");

cron.schedule("0 2 * * *", () => {
    console.log("⏳ Running scheduled MongoDB backup...");
    backupMongoDB();
});

cron.schedule("0 3 * * *", () => {
    console.log("⏳ Running scheduled MySQL backup...");
    backupMySQL();
});
