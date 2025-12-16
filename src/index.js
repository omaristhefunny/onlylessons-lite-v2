import { createBareServer } from "@tomphttp/bare-server-node";
import express from "express";
import { createServer } from "node:http";
import { publicPath } from "ultraviolet-static";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { join } from "node:path";
import { hostname } from "node:os";
import cors from "cors";

const bare = createBareServer("/bare/", {
  connectionLimiter: {
    maxConnectionsPerIP: 15000,
    windowDuration: 60,
    blockDuration: 60,
  },
});
const app = express();

// CORS and security headers
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  // Set COOP/COEP headers for routes that need SharedArrayBuffer (WebAssembly games, portal, etc.)
  if (
    req.path.includes("portal") ||
    req.path.includes("terraria") ||
    req.path.includes("science/") ||
    req.path.includes(".wasm") ||
    req.path.includes("dotnet")
  ) {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  }
  next();
});

app.use(express.static(publicPath));
app.use("/frog/", express.static(uvPath));
app.get("/calculus", (req, res) => {
  res.sendFile(join(publicPath, "calculus.html"));
});
app.get("/record", (req, res) => {
  res.sendFile(join(publicPath, "record.html"));
});

function toIPv4(ip) {
  if (!ip) return '127.0.0.1';
  if (ip.includes(',')) ip = ip.split(',')[0].trim();
  if (ip.startsWith('::ffff:')) ip = ip.replace('::ffff:', '');
  return ip.match(/^(\d{1,3}\.){3}\d{1,3}$/) ? ip : '127.0.0.1';
}

const routes = [
  { path: "/", file: "index.html" },
  { path: "/g", file: "science.html" },
  { path: "/p", file: "partners.html" },
  { path: "/404", file: "404.html" },
  { path: "/606,", file: "proxy.html" },
];
routes.forEach((route) => {
  app.get(route.path, (req, res) => {
    res.sendFile(join(publicPath, route.file));
  });
});
app.get('/ip', (req, res) => {
  const rawIp = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const ipv4 = toIPv4(rawIp);
  const prefix = ipv4.split('.')[0];
  res.send(prefix);
});

app.use((req, res) => {
  res.redirect("/404");
});
const server = createServer();

server.maxConnections = null;  // Unlimited connections
server.maxRequestsPerSocket = 0;  // 0 = unlimited requests per socket
server.keepAliveTimeout = 65000;  // Increase keep-alive timeout
server.headersTimeout = 66000;

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

let port = parseInt(process.env.PORT || "");

if (isNaN(port)) port = 6767;

server.on("listening", () => {
  const address = server.address();

  console.log("Listening on:");
  console.log(`\thttp://localhost:${address.port}`);
  console.log(`\thttp://${hostname()}:${address.port}`);
  console.log(
    `\thttp://${
      address.family === "IPv6" ? `[${address.address}]` : address.address
    }:${address.port}`
  );
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close();
  bare.close();
  process.exit(0);
}

server.listen({
  port,
});
