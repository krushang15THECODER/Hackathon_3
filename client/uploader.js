const DEFAULT_SERVER_URL = "http://localhost:5000/upload";
// IMPORTANT FIX (Node compatibility)
const fetchFn = global.fetch || require("node-fetch");
async function uploadPayload(systemInfo, files) {
  const endpoint = process.env.THUNDER_SERVER_URL || DEFAULT_SERVER_URL;
  const payload = {
    systemInfo,
    files
  };




  // ADD THIS HERE 🔥
  const payloadString = JSON.stringify(payload);
  const sizeMB = (Buffer.byteLength(payloadString) / (1024 * 1024)).toFixed(2);
  console.log("Payload size:", sizeMB, "MB");





  try {
    const response = await fetchFn(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const responseText = await response.text();
    let responseBody;

    try {
      responseBody = responseText ? JSON.parse(responseText) : {};
    } catch (error) {
      responseBody = { message: responseText };
    }

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        error: responseBody.error || responseBody.message || "Upload failed"
      };
    }

    return {
      success: true,
      status: response.status,
      data: responseBody
    };
  } catch (error) {
    return {
      success: false,
      status: null,
      error: error.message || "Unable to upload payload"
    };
  }
}

module.exports = uploadPayload;
