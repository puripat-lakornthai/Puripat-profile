// server.js - Vite+React static + minimal API
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ใช้ ENV DIST_DIR ถ้ามี; ไม่งั้น fallback เป็น ./dist
const distPath = path.resolve(process.env.DIST_DIR || path.join(__dirname, "dist"));
console.log("Serving from:", distPath);

// Middlewares
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("tiny"));

// API example
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Static + SPA fallback
app.use(express.static(distPath));
app.use("/api", (_req, res) => res.status(404).json({ error: "Not Found" }));
app.get("*", (_req, res) => res.sendFile(path.join(distPath, "index.html")));

const port = Number(process.env.PORT) || 3000;
app.listen(port, "0.0.0.0", () => console.log(`✅ Server on http://0.0.0.0:${port}`));
