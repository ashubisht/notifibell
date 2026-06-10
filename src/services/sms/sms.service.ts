import { PublishCommand } from "@aws-sdk/client-sns";
import { snsClient } from "../../aws/clients";
import type { SmsMessage } from "../../types/sms";

export async function sendSms(message: SmsMessage) {
  const command = new PublishCommand({
    Message: message.message,
    PhoneNumber: `+${message.phone}`,
    MessageAttributes: {
      "AWS.SNS.SMS.SenderID": {
        DataType: "String",
        StringValue: message.subject,
      },
      "AWS.SNS.SMS.SMSType": {
        DataType: "String",
        StringValue: message.msgType,
      },
    },
  });

  return snsClient.send(command);
}
