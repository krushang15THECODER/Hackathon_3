const fs = require("fs");
const path = require("path");

const storageDirectory = path.join(__dirname, "storage");

function ensureStorageDirectory() {
  if (!fs.existsSync(storageDirectory)) {
    fs.mkdirSync(storageDirectory, { recursive: true });
  }
}

function createSubmissionId() {
  return `submission-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function getSubmissionPath(id) {
  return path.join(storageDirectory, `${id}.json`);
}

function readSubmissionFile(fileName) {
  const filePath = path.join(storageDirectory, fileName);
  const content = fs.readFileSync(filePath, "utf8");
  return JSON.parse(content);
}

function uploadSubmission(req, res) {
  try {
    ensureStorageDirectory();

    const submissionId = createSubmissionId();
    const timestamp = new Date().toISOString();
    const submission = {
      id: submissionId,
      timestamp,
      systemInfo: req.body.systemInfo || {},
      files: Array.isArray(req.body.files) ? req.body.files : []
    };

    fs.writeFileSync(
      getSubmissionPath(submissionId),
      JSON.stringify(submission, null, 2),
      "utf8"
    );

    res.status(201).json({
      success: true,
      id: submissionId,
      timestamp,
      fileCount: submission.files.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to save submission"
    });
  }
}

function getSubmissions(req, res) {
  try {
    ensureStorageDirectory();

    const submissions = fs
      .readdirSync(storageDirectory)
      .filter((fileName) => fileName.endsWith(".json"))
      .map((fileName) => {
        const submission = readSubmissionFile(fileName);

        return {
          id: submission.id,
          timestamp: submission.timestamp,
          fileCount: Array.isArray(submission.files) ? submission.files.length : 0
        };
      });

    res.json({
      success: true,
      submissions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to read submissions"
    });
  }
}

function getSubmissionById(req, res) {
  try {
    ensureStorageDirectory();

    const submissionPath = getSubmissionPath(req.params.id);

    if (!fs.existsSync(submissionPath)) {
      return res.status(404).json({
        success: false,
        error: "Submission not found"
      });
    }

    const submission = JSON.parse(fs.readFileSync(submissionPath, "utf8"));

    return res.json({
      success: true,
      submission
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to read submission"
    });
  }
}

module.exports = {
  uploadSubmission,
  getSubmissions,
  getSubmissionById
};
