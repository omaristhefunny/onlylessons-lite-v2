import { createBareServer } from "@tomphttp/bare-server-node";
import express from "express";
import { createServer } from "node:http";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { hostname } from "node:os";
import { config } from "dotenv";
import cors from "cors";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicPath = join(__dirname, "../static/public");

config({ path: join(__dirname, "../.env") });

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

const bare = createBareServer("/bare/", {
  codec: "x-python",
  connectionLimiter: {
    maxConnectionsPerIP: 30,
    windowDuration: 60000,
    blockDuration: 60000,
  },
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(publicPath));
app.use("/lessons/", express.static(uvPath));

app.get("/lessons/ixl/", (req, res) => {
  res.redirect("/embed.html");
});

const routes = [
  { path: "/", file: "index.html" },
  { path: "/s", file: "calculus.html" },
  { path: "/g", file: "science.html" },
  { path: "/p", file: "partners.html" },
  { path: "/c", file: "chat.html" },
  { path: "/ai", file: "ai-chat.html" },
  { path: "/studying", file: "studying.html" },
  { path: "/404", file: "404.html" },
  { path: "/606", file: "proxy.html" },
  { path: "/embed.html", file: "embed.html" },
  { path: "/embed-wrapper.html", file: "embed-wrapper.html" },
];

routes.forEach(({ path, file }) => {
  app.get(path, (req, res) => res.sendFile(join(publicPath, file)));
});

app.get("/ip", (req, res) => {
  const ip = req.headers["cf-connecting-ip"] || req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1";
  const first = ip.split(",")[0].split(".")[0];
  res.send(first);
});

app.get("/csrf-token", (req, res) => {
  res.json({ csrfToken: Math.random().toString(36).substring(2) });
});

app.post("/ask", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const { messages, model } = req.body;
  if (!messages || !Array.isArray(messages))
    return res.status(400).json({ error: "Invalid messages format" });

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://onlylessons.network",
        "X-Title": "OnlyLessons",
      },
      body: JSON.stringify({ model: model || "openrouter/free", messages }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenRouter error:", errorData);
      return res.status(response.status).json({ error: "Failed to get response" });
    }

    const data = await response.json();
    res.json({ message: data.choices?.[0]?.message?.content || "No response" });
  } catch (error) {
    console.error("AI request error:", error);
    res.status(500).json({ error: "Failed to reach AI service" });
  }
});

app.use((req, res) => {
  res.status(404).sendFile(join(publicPath, "404.html"));
});

const server = createServer();

server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

const PORT = parseInt(process.env.PORT || "8080");

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
  console.log(`http://${hostname()}:${PORT}`);
});

process.on("SIGINT", () => {
  console.log("Shutting down...");
  server.close();
  bare.close();
  process.exit(0);
});