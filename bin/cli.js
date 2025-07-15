#!/usr/bin/env node
const { Command } = require("commander");
const { backupMongoDB, backupMySQL } = require("../src/backup/backupService");
const { restoreMongoDB, restoreMySQL } = require("../src/backup/restoreService");

const program = new Command();

program.version("1.0.0").description("Database Backup and Restore CLI");

// Backup Commands
program.command("backup-mongo").description("Backup MongoDB database").action(backupMongoDB);
program.command("backup-mysql").description("Backup MySQL database").action(backupMySQL);

// Restore MongoDB with `--drop` and `--to`
program
    .command("restore-mongo <backupFile>")
    .description("Restore MongoDB from a backup file")
    .option("--drop", "Drop existing collections before restoring")
    .option("--to <database>", "Restore to a different database")
    .action((backupFile, options) => {
        restoreMongoDB(backupFile, options);
    });

// Restore MySQL
program.command("restore-mysql <backupFile>").description("Restore MySQL from a backup file").action(restoreMySQL);

program.parse(process.argv);
