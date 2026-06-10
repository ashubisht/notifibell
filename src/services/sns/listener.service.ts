import type { Request, Response } from "express";

export function handleSnsNotification(req: Request, res: Response): void {
  const dataChunks: string[] = [];

  req.on("data", (chunk: Buffer | string) => {
    dataChunks.push(chunk.toString());
  });

  req.on("end", () => {
    const message = JSON.parse(dataChunks.join("")) as unknown;
    console.log("SNS notification received:", message);
    res.status(200).send("SUCCESS");
  });

  req.on("error", () => {
    const partialMessage = JSON.parse(dataChunks.join("")) as unknown;
    console.log("SNS listener error, partial message:", partialMessage);
    res.status(500).send("Message retrieval has an error");
  });

  req.on("close", () => {
    console.log("SNS listener connection closed");
  });
}
