const { exec } = require("child_process");

require("dotenv").config();

const fs = require("fs-extra");
const { saveLocally } = require("../storage/localStorage");
const { uploadToS3 } = require("../storage/cloudStorage");
const { logBackup } = require("../utils/logger");
const { sendSlackNotification } = require("../utils/notifier");

// MongoDB Backup
const backupMongoDB = async () => {
    const backupPath = `./backups/mongodb-${Date.now()}.gz`;
    const command = `mongodump --uri="${process.env.MONGO_URI}" --gzip --archive=${backupPath}`;

    exec(command, async (error) => {
        if (error) {
            console.error("❌ MongoDB Backup Error:", error);
            return;
        }

        console.log("✅ MongoDB Backup Successful:", backupPath);
        logBackup("MongoDB", backupPath);
        saveLocally(backupPath);
        
        sendSlackNotification(`✅ MongoDB Backup Completed: ${backupPath}`);
    });
};

// MySQL Backup
const backupMySQL = async () => {
    const backupPath = `./backups/mysql-${Date.now()}.sql`;
    const command = `mysqldump -h ${process.env.MYSQL_HOST} -u ${process.env.MYSQL_USER} --password=${process.env.MYSQL_PASSWORD} ${process.env.MYSQL_DB} > ${backupPath}`;

    exec(command, async (error) => {
        if (error) {
            console.error("❌ MySQL Backup Error:", error);
            return;
        }

        console.log("✅ MySQL Backup Successful:", backupPath);
        logBackup("MySQL", backupPath);
        saveLocally(backupPath);
      
        sendSlackNotification(`✅ MySQL Backup Completed: ${backupPath}`);
    });
};

module.exports = { backupMongoDB, backupMySQL };
