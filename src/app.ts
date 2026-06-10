import { config } from "dotenv";
import express, { type Request, type RequestHandler, type Response } from "express";
import type { ISMS } from "./interface/ISMS";
import { sendSMS } from "./sms/sms";
import { sendEmail } from "./email/email";
import { publishMessage, listenMessage } from "./http/http";

config();

const asyncHandler =
  (handler: (req: Request, res: Response) => Promise<void | Response>): RequestHandler =>
  (req, res, next) => {
    void handler(req, res).catch(next);
  };

const app = express();

app.post("/listener", (req, res) => {
  console.log("A message has been listened: ", req.body, "\n", req.headers);
  listenMessage(req, res);
});

app.use(express.json());

app.post(
  "/publish",
  asyncHandler(async (_req, res) => {
    const resp = await publishMessage("This is a test message");
    res.status(200).send(JSON.stringify({ success: true, messageId: resp.MessageId }));
  }),
);

app.post(
  "/sms",
  asyncHandler(async (req, res) => {
    const msg = req.body as ISMS;
    try {
      const publishText = await sendSMS(msg);
      res.end(JSON.stringify({ MessageID: publishText.MessageId }));
    } catch (err) {
      console.log("An error occurred: ", err);
      res.end(JSON.stringify({ Error: err }));
    }
  }),
);

app.post(
  "/email",
  asyncHandler(async (_req, res) => {
    try {
      const resp = await sendEmail();
      res.send(resp);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error in processing the request");
    }
  }),
);

app.get("/", (_req, res) => {
  res.status(200).send("This is a test page confirming the site is up");
});

app.get("/listener", (_req, res) => {
  res.status(200).send("Use post method to receive listener items");
});

export { app };
