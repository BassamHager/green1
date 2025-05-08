const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

// Load environment variables
const repoPath = process.env.GITHUB_REPO_PATH;
const githubToken = process.env.GITHUB_TOKEN;
const githubRepo = process.env.GITHUB_REPO;
const githubBranch = process.env.GITHUB_BRANCH || "master"; // fallback to master

if (!repoPath || !githubToken || !githubRepo) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

const logsFileName = "logs.txt";
const timeAndDate = `${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}`;

const logFilePath = path.join(repoPath, logsFileName);

try {
  fs.appendFileSync(
    logFilePath,
    `\nAutomated update: ${timeAndDate}\n`,
    "utf8"
  );
} catch (err) {
  console.error("Failed to write to logs:", err);
  process.exit(1);
}

const runCommand = (command, options = {}) => {
  return new Promise((resolve, reject) => {
    exec(command, { cwd: repoPath, ...options }, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
      } else if (stderr) {
        reject(`Stderr: ${stderr}`);
      } else {
        resolve(stdout);
      }
    });
  });
};

const automateGit = async () => {
  await runCommand(`git add .`);
  await runCommand(`git commit -m "Update: ${timeAndDate}"`);
  await runCommand(
    `git push https://${githubToken}@github.com/${githubRepo}.git ${githubBranch}`
  );
  console.log("Commit and push successful.");
};

const main = async () => {
  try {
    await automateGit();
  } catch (error) {
    console.error("Git automation failed:", error);
    process.exit(1);
  }
};

main();
