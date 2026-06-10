import { SESClient } from "@aws-sdk/client-ses";
import { SNSClient } from "@aws-sdk/client-sns";

const region = process.env.AWS_REGION;

export const snsClient = new SNSClient({ region });
export const sesClient = new SESClient({ region });
