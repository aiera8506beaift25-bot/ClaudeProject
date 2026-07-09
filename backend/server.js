const express = require("express");
const cors = require("cors");
require("dotenv").config();

const analyzeRoute = require("./routes/analyze");

const app = express();

// Allow requests from local dev and any Vercel deployment.
// Set ALLOWED_ORIGIN env var on Koyeb to your exact Vercel URL.
const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  process.env.ALLOWED_ORIGIN, // e.g. https://your-app.vercel.app
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, Postman, server-to-server)
      if (!origin) return callback(null, true);
      if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    methods: ["GET", "POST"],
  }),
);

app.use(express.json());

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
const IS_PROD = process.env.NODE_ENV === "production";

// In production (Koyeb) don't use exclusive mode — the platform manages ports.
const listenOptions = IS_PROD ? PORT : { port: PORT, exclusive: true };

const server = app.listen(listenOptions, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `\n Port ${PORT} is already in use.` +
        `\n Kill it first:  npx kill-port ${PORT}\n`,
    );
  } else {
    console.error("Server failed to start:", err);
  }
  process.exit(1);
});
