const fs = require("fs");
const path = require("path");
const os = require("os");

const ALLOWED_EXTENSIONS = new Set([
  ".js",
  ".py",
  ".java",
  ".cpp",
  ".c",
  ".ts",
  ".html",
  ".css",
  ".jsx"
]);


const MAX_FILE_SIZE = 5 * 1024 * 1024;




function getDefaultScanDirectories() {
  const homeDirectory = os.homedir();

  return ["Desktop", "Documents", "Downloads"].map((directoryName) =>
    path.join(homeDirectory, directoryName)
  );
}

function isAllowedFile(filePath) {
  return ALLOWED_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

// function readCodeFile(filePath) {
//   try {
//     return {
//       path: filePath,
//       name: path.basename(filePath),
//       extension: path.extname(filePath).toLowerCase(),
//       content: fs.readFileSync(filePath, "utf8")
//     };
//   } catch (error) {
//     return null;
//   }
// }

function readCodeFile(filePath) {
  try {
    const stats = fs.statSync(filePath);

    if (stats.size > MAX_FILE_SIZE) {
      console.log("Skipped large file:", filePath);
      return null;
    }

    return {
      path: filePath,
      name: path.basename(filePath),
      extension: path.extname(filePath).toLowerCase(),
      content: fs.readFileSync(filePath, "utf8")
    };
  } catch (error) {
    return null;
  }
}


function scanDirectory(directoryPath, files) {
  let entries;

  try {
    entries = fs.readdirSync(directoryPath, { withFileTypes: true });
  } catch (error) {
    return;
  }

  entries.forEach((entry) => {
    const entryPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      scanDirectory(entryPath, files);
      return;
    }

    if (entry.isFile() && isAllowedFile(entryPath)) {
      const file = readCodeFile(entryPath);

      if (file) {
        files.push(file);
      }
    }
  });
}

function scanCodeFiles() {
  const files = [];
  const directories = getDefaultScanDirectories();

  directories.forEach((directoryPath) => {
    scanDirectory(directoryPath, files);
  });

  return files;
}

module.exports = scanCodeFiles;
