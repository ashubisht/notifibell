import {
  DeleteVerifiedEmailAddressCommand,
  ListVerifiedEmailAddressesCommand,
  SendRawEmailCommand,
  VerifyEmailIdentityCommand,
} from "@aws-sdk/client-ses";
import { sesClient } from "../aws/clients";

const email = "utkarsh.bisht7@gmail.com";

export const verify = async () => {
  const command = new VerifyEmailIdentityCommand({
    EmailAddress: email,
  });
  return await sesClient.send(command);
};

export const listVerifiedEmails = async () => {
  const command = new ListVerifiedEmailAddressesCommand({});
  return await sesClient.send(command);
};

export const deleteEmailAddress = async (address: string) => {
  const command = new DeleteVerifiedEmailAddressCommand({
    EmailAddress: address,
  });
  return await sesClient.send(command);
};

export const sendEmail = async () => {
  let sesMail = "From: 'AWS SES' <" + email + ">\n";
  sesMail = sesMail + "To: " + "utkarsh.bisht@outlook.com" + "\n";
  sesMail = sesMail + "Subject: AWS SES Attachment Example\n";
  sesMail = sesMail + "MIME-Version: 1.0\n";
  sesMail = sesMail + 'Content-Type: multipart/mixed; boundary="NextPart"\n\n';
  sesMail = sesMail + "--NextPart\n";
  sesMail = sesMail + "Content-Type: text/html; charset=us-ascii\n\n";
  sesMail = sesMail + "This is the body of the email.\n\n";
  sesMail = sesMail + "--NextPart\n";
  sesMail = sesMail + "Content-Type: text/plain;\n";
  sesMail = sesMail + 'Content-Disposition: attachment; filename="attachment.txt"\n\n';
  sesMail = sesMail + "AWS Tutorial Series - Really cool file attachment!" + "\n\n";
  sesMail = sesMail + "--NextPart--";

  const command = new SendRawEmailCommand({
    RawMessage: { Data: Buffer.from(sesMail) },
    Destinations: ["utkarsh.bisht@outlook.com"],
    Source: "'AWS Tutorial Series' <" + email + ">'",
  });

  return await sesClient.send(command);
};
