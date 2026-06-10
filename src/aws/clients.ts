import { SESClient } from "@aws-sdk/client-ses";
import { SNSClient } from "@aws-sdk/client-sns";
import { config } from "../config/env";

export const snsClient = new SNSClient({ region: config.aws.region });
export const sesClient = new SESClient({ region: config.aws.region });
