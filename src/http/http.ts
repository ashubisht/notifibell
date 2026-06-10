import { PublishCommand } from "@aws-sdk/client-sns";
import type { Request, Response } from "express";
import { snsClient } from "../aws/clients";

export const publishMessage = async (msg: string) => {
  try {
    const command = new PublishCommand({
      Message: msg,
      TopicArn: process.env.TOPIC_ARN,
      Subject: "This is subject of message",
    });
    return await snsClient.send(command);
  } catch (err) {
    console.log("An error occurred: ", err);
    throw err;
  }
};

export const listenMessage = (req: Request, res: Response) => {
  const dataChunks: string[] = [];
  req.on("data", (chunk: Buffer | string) => {
    dataChunks.push(chunk.toString());
  });
  req.on("end", () => {
    const message = JSON.parse(dataChunks.join("")) as unknown;
    console.log(message);
    res.status(200).send("SUCCESS");
  });
  req.on("error", () => {
    const partialMessage = JSON.parse(dataChunks.join("")) as unknown;
    console.log("Received an error, with partial message as: ", partialMessage);
    res.status(500).send("Message retrieval has an error");
  });
  req.on("close", () => {
    console.log("close event occurred");
  });
};
