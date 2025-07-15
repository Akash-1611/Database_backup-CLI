const winston = require("winston");
const path = require("path");

// Logger Configuration
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.File({ filename: path.resolve(__dirname, "../../logs/backup.log") }),
        new winston.transports.Console()
    ]
});

// Function to Log Backup Activities
const logBackup = (dbType, backupFile) => {
    logger.info(`Backup completed for ${dbType}: ${backupFile}`);
};

module.exports = { logBackup };
