// server.js - Minimal backend for Vite + React (Express)
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const distPath = path.join(__dirname, "dist");

// Middlewares
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("tiny"));

// --- Example API routes ---
app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.get("/api/time", (_req, res) => res.json({ now: new Date().toISOString() }));
app.post("/api/echo", (req, res) => res.json({ youSent: req.body || null }));

// Serve static files from Vite build
app.use(express.static(distPath));

// 404 for API specifically
app.use("/api", (_req, res) => res.status(404).json({ error: "Not Found" }));

// SPA fallback for React Router etc.
app.get("*", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const port = Number(process.env.PORT) || 3000;
const host = "0.0.0.0";
app.listen(port, host, () => console.log(`✅ Server running on http://${host}:${port}`));
