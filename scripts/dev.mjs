import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const frontendRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const projectRoot = resolve(frontendRoot, "..");
const backendRoot = [
  resolve(projectRoot, "Mr_Music_Mack-Backend-main"),
  resolve(projectRoot, "Backend"),
].find((directory) => existsSync(resolve(directory, "server.js")));
const viteBin = resolve(frontendRoot, "node_modules", "vite", "bin", "vite.js");
const backendHost = process.env.HOST || "127.0.0.1";
const backendPort = process.env.PORT || "3001";

async function isBackendRunning() {
  try {
    const response = await fetch(`http://${backendHost}:${backendPort}/api/health`);
    return response.ok;
  } catch {
    return false;
  }
}

const processes = [];

if (await isBackendRunning()) {
  console.log(`MR MUSIC MACK API already running: http://${backendHost}:${backendPort}`);
} else {
  if (!backendRoot) {
    console.error(`Backend server.js not found. Expected a sibling folder named Mr_Music_Mack-Backend-main or Backend in ${projectRoot}.`);
    process.exit(1);
  }
  processes.push(spawn(process.execPath, ["--watch", "--watch-preserve-output", "server.js"], {
    cwd: backendRoot,
    env: { ...process.env, HOST: backendHost, PORT: backendPort },
    stdio: "inherit",
  }));
}

processes.push(spawn(process.execPath, [viteBin], {
  cwd: frontendRoot,
  stdio: "inherit",
}));

let shuttingDown = false;

function shutdown(code = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of processes) {
    if (!child.killed) child.kill();
  }
  process.exit(code);
}

for (const child of processes) {
  child.on("error", (error) => {
    console.error(`Could not start development process: ${error.message}`);
    shutdown(1);
  });
  child.on("exit", (code, signal) => {
    if (!shuttingDown && code !== 0 && signal !== "SIGTERM") {
      shutdown(code || 1);
    }
  });
}

process.on("SIGINT", () => shutdown());
process.on("SIGTERM", () => shutdown());
