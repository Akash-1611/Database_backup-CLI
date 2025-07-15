const fs = require("fs-extra");
const path = require("path");

// Function to save backup files locally
const saveLocally = async (backupFile) => {
    const backupDir = path.resolve(__dirname, "../../backups");

    // Ensure backup directory exists
    await fs.ensureDir(backupDir);

    // Move file to backup directory
    const destination = path.join(backupDir, path.basename(backupFile));
    await fs.move(backupFile, destination, { overwrite: true });

    console.log("✅ Backup saved locally:", destination);
};

module.exports = { saveLocally };
