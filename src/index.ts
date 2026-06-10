import cluster from "node:cluster";
import os from "node:os";
import process from "node:process";
import { app } from "./app";

if (cluster.isPrimary) {
  const availableThreads = os.cpus().length;
  const forks =
    process.env.FORK_COUNT !== undefined ? parseInt(process.env.FORK_COUNT, 10) : availableThreads;
  console.log("Available core threads: ", availableThreads);
  console.log("using threads = ", forks);

  for (let i = 0; i < forks; i++) {
    cluster.fork();
    console.log("A cluster is started");
  }

  cluster.on("exit", (worker) => {
    console.log("A worker exited with id: ", worker.id);
    cluster.fork();
  });
} else {
  app.listen(3000, () => {
    console.log("Server is started");
  });
}
