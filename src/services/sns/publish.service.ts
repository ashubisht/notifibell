import { PublishCommand } from "@aws-sdk/client-sns";
import { snsClient } from "../../aws/clients";
import { getTopicArn } from "../../config/env";

export async function publishToTopic(message: string, subject = "Notification") {
  const command = new PublishCommand({
    Message: message,
    TopicArn: getTopicArn(),
    Subject: subject,
  });

  return snsClient.send(command);
}
