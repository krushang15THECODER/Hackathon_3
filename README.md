# Thunder Hackathon

Thunder Hackathon is a Node.js MVP that runs a local client agent, collects basic system information, scans common coding folders for source files, and uploads the payload to a simple Express server.

## Project Objective

The goal is to provide a lightweight hackathon demo for collecting evaluator machine metadata and code files from common directories, then storing each upload as a JSON submission on the server.

The client collects:

- Operating system details
- CPU architecture
- Hostname
- Node.js version
- Platform information
- User home directory
- Selected environment variables
- Code files from Desktop, Documents, and Downloads

## Architecture

```text
thunder-hackathon/
├── client/
│   ├── thunder.js
│   ├── systemInfo.js
│   ├── scanner.js
│   └── uploader.js
│
├── server/
│   ├── server.js
│   ├── controller.js
│   └── storage/
│
├── package.json
└── README.md
```

## Code Flow

```text
client/thunder.js
→ client/systemInfo.js collects system details
→ client/scanner.js scans Desktop, Documents, and Downloads
→ client/uploader.js sends { systemInfo, files }
→ server/server.js receives the request
→ server/controller.js saves the submission as JSON
→ server/storage stores uploaded submissions
```

Supported file extensions:

```text
.js .py .java .cpp .c .ts .html .css .jsx
```

Server endpoints:

```text
GET  /health
POST /upload
GET  /submissions
GET  /submissions/:id
```

## Setup Steps

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm run start:server
```

Run the client in another terminal:

```bash
npm run start:client
```

For development with auto-restart:

```bash
npm run dev
```

By default, the client uploads to:

```text
http://localhost:5000/upload
```

To use a deployed server:

```bash
THUNDER_SERVER_URL=https://your-render-app.onrender.com/upload npm run start:client
```

## Deployment Steps

1. Push the project to GitHub.
2. Create a new Render Web Service.
3. Connect the GitHub repository.
4. Use the following settings:

```text
Build Command: npm install
Start Command: npm start
```

5. Render will provide `PORT` automatically.
6. After deployment, update the client upload URL with `THUNDER_SERVER_URL`.

## Sample Output

Client console:

```text
Starting Thunder...
Collecting system info...
Scanning files...
Uploading...
Upload complete.
{
  success: true,
  status: 201,
  data: {
    success: true,
    id: "submission-1712345678901-a1b2c3",
    timestamp: "2026-06-20T10:30:00.000Z",
    fileCount: 12
  }
}
```

Saved server file:

```text
server/storage/submission-1712345678901-a1b2c3.json
```

Submission list response:

```json
{
  "success": true,
  "submissions": [
    {
      "id": "submission-1712345678901-a1b2c3",
      "timestamp": "2026-06-20T10:30:00.000Z",
      "fileCount": 12
    }
  ]
}
```
