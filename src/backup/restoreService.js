const { spawn } = require("child_process");
const fs = require("fs");

const restoreMongoDB = async (backupFile, options) => {
    if (!fs.existsSync(backupFile)) {
        console.error("❌ Error: Backup file not found:", backupFile);
        return;
    }

    let command = ["mongorestore", "--gzip", `--archive=${backupFile}`];

    if (options.drop) {
        command.push("--drop");
        console.log("⚠️ Dropping existing collections before restoring...");
    }

    if (options.to) {
        command.push(`--nsInclude=${options.to}.*`);
        console.log(`🔄 Restoring backup to new database: ${options.to}`);
    }

    console.log(`🚀 Running restore command: ${command.join(" ")}`);

    const restoreProcess = spawn(command[0], command.slice(1));

    restoreProcess.stdout.on("data", (data) => {
        console.log(`📜 STDOUT: ${data}`);
    });

    restoreProcess.stderr.on("data", (data) => {
        console.error(`❌ STDERR: ${data}`);
    });

    restoreProcess.on("close", (code) => {
        if (code === 0) {
            console.log("✅ MongoDB Restore Successful!");
        } else {
            console.error(`❌ MongoDB Restore Failed with exit code: ${code}`);
        }
    });
};

module.exports = { restoreMongoDB };
