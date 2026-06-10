import cluster from "node:cluster";
import os from "node:os";
import { createApp } from "./app";
import { config } from "./config/env";

function startWorker(): void {
  const app = createApp();

  app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
  });
}

function startCluster(): void {
  const availableThreads = os.cpus().length;
  const forks = config.cluster.forkCount ?? availableThreads;

  console.log("Available core threads:", availableThreads);
  console.log("Using threads:", forks);

  for (let i = 0; i < forks; i++) {
    cluster.fork();
    console.log("A cluster worker started");
  }

  cluster.on("exit", (worker) => {
    console.log("A worker exited with id:", worker.id);
    cluster.fork();
  });
}

export function startServer(): void {
  if (cluster.isPrimary) {
    startCluster();
  } else {
    startWorker();
  }
}
