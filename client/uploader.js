const DEFAULT_SERVER_URL = "https://thunder-hackathon3.onrender.com/upload";
// IMPORTANT FIX (Node compatibility)
const fetchFn = global.fetch || require("node-fetch");
async function uploadPayload(systemInfo, files) {
  const endpoint = process.env.THUNDER_SERVER_URL || DEFAULT_SERVER_URL;
  const payload = {
    systemInfo,
    files
  };
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
