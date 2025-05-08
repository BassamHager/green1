const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

// Configuration
const repoPath = "/Users/douaahasan/Projects/learn/github/green1"; // Replace with the path to your repo
const logsFileName = "logs.txt";
const commitMessage = "Automated commit";
const githubToken = process.env.GITHUB_TOKEN;
const githubRepo = process.env.GITHUB_REPO;

// Change directory to the repo
process.chdir(repoPath);

// Generate content in the file
const timeAndDate = `${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}`;
fs.appendFileSync(
  path.join(repoPath, logsFileName),
  `\nAutomated update: ${timeAndDate}\n`,
  "utf8"
);

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
    await runCommand(`git commit -m "Update: ${timeAndDate}"`);
    await runCommand(
      `git push https://${githubToken}@github.com/${githubRepo}.git master`
    );
    console.log("Commit and push successful.");
  } catch (error) {
    console.error("Failed:", error);
  }
};

// Run the automation
try {
  automateGit();
} catch (error) {
  console.log(error);
}
