const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

// Configuration
const repoPath = "/Users/douaahasan/Projects/learn/github/green1"; // Replace with the path to your repo
const fileName = "main.js";
const commitMessage = "Automated commit";
const githubToken =
  "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"; // Replace with your GitHub token
const githubRepo = "BassamHager/green1"; // Replace with your username and repo

// Change directory to the repo
process.chdir(repoPath);

// Generate content in the file
fs.appendFileSync(
  path.join(repoPath, fileName),
  `Automated update: ${new Date().toISOString()}\n`,
  "utf8"
);

// Function to execute shell commands
const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
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

// Automate git commands
const automateGit = async () => {
  try {
    await runCommand(`git add .`);
    await runCommand(`git commit -m "${commitMessage}"`);
    await runCommand(
      `git push https://${githubToken}@github.com/${githubRepo}.git main`
    );
    console.log("Commit and push successful.");
  } catch (error) {
    console.error("Failed:", error);
  }
};

// Run the automation
automateGit();
Automated update: 2024-11-18T03:07:56.364Z
