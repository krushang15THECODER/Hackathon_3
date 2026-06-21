const express = require("express");
const controller = require("./controller");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "200mb" }));

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "thunder-hackathon-server"
  });
});

app.post("/upload", controller.uploadSubmission);
app.get("/submissions", controller.getSubmissions);
app.get("/submissions/:id", controller.getSubmissionById);
app.get("/", (req, res) => {
  res.send("🔥 Thunder Hackathon Server is running");
});
app.listen(PORT, () => {
  console.log(`Thunder server running on port ${PORT}`);
  console.log(`Local URL: http://localhost:${PORT}`);
});
