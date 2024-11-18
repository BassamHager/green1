const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

// Configuration
const repoPath = "/path/to/your/repo"; // Replace with the path to your repo
const fileName = "auto_generated_file.txt";
const commitMessage = "Automated commit";
const githubToken = "your_personal_access_token"; // Replace with your GitHub token
const githubRepo = "yourusername/your-repo-name"; // Replace with your username and repo

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
    await runCommand(`git add ${fileName}`);
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
