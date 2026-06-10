import { PublishCommand } from "@aws-sdk/client-sns";
import type { ISMS } from "../interface/ISMS";
import { snsClient } from "../aws/clients";

export const sendSMS = async (msg: ISMS) => {
  console.log("Message = " + msg.message);
  console.log("Number = " + msg.phone);
  console.log("Subject = " + msg.subject);
  console.log("MsgType = ", msg.msgType);

  const command = new PublishCommand({
    Message: msg.message,
    PhoneNumber: "+" + msg.phone,
    MessageAttributes: {
      "AWS.SNS.SMS.SenderID": {
        DataType: "String",
        StringValue: msg.subject,
      },
      "AWS.SNS.SMS.SMSType": {
        DataType: "String",
        StringValue: msg.msgType,
      },
    },
  });

  try {
    return await snsClient.send(command);
  } catch (err) {
    console.log("An error occurred: ", err);
    throw err;
  }
};
