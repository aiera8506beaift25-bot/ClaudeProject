console.log("THIS IS MY SERVER");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const analyzeRoute = require("./routes/analyze");

const app = express();

app.use(cors());
app.use(express.json());

// Log every incoming request
app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});

app.use("/analyze", analyzeRoute);

app.get("/", (req, res) => {
  res.send("🚀 ClauseWise Backend Running");
});

app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({
    success: false,
    message: err.message,
  });
});

const PORT = process.env.PORT || 5000;

// exclusive: true forces a hard EADDRINUSE instead of Windows silently
// letting a second process "share" the port and serve stale code.
const server = app.listen({ port: PORT, exclusive: true }, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `\n Port ${PORT} is already in use by another (stale) process.` +
        `\n   That old process is still serving requests with OLD code, so your` +
        `\n   edits won't take effect and /analyze may appear to hang.` +
        `\n   Kill it first, e.g.:  npx kill-port ${PORT}` +
        `\n   or: netstat -ano | findstr :${PORT}  then  taskkill /F /PID <pid>\n`
    );
  } else {
    console.error("Server failed to start:", err);
  }
  process.exit(1);
});