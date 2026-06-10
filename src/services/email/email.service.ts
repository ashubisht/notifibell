import {
  DeleteVerifiedEmailAddressCommand,
  ListVerifiedEmailAddressesCommand,
  SendRawEmailCommand,
  VerifyEmailIdentityCommand,
} from "@aws-sdk/client-ses";
import { sesClient } from "../../aws/clients";
import { getEmailAddresses } from "../../config/env";

export async function verifyEmailIdentity(email: string) {
  const command = new VerifyEmailIdentityCommand({ EmailAddress: email });
  return sesClient.send(command);
}

export async function listVerifiedEmails() {
  const command = new ListVerifiedEmailAddressesCommand({});
  return sesClient.send(command);
}

export async function deleteVerifiedEmail(address: string) {
  const command = new DeleteVerifiedEmailAddressCommand({ EmailAddress: address });
  return sesClient.send(command);
}

export async function sendEmail() {
  const { from, to } = getEmailAddresses();

  const rawMessage = [
    `From: 'AWS SES' <${from}>`,
    `To: ${to}`,
    "Subject: AWS SES Attachment Example",
    "MIME-Version: 1.0",
    'Content-Type: multipart/mixed; boundary="NextPart"',
    "",
    "--NextPart",
    "Content-Type: text/html; charset=us-ascii",
    "",
    "This is the body of the email.",
    "",
    "--NextPart",
    "Content-Type: text/plain;",
    'Content-Disposition: attachment; filename="attachment.txt"',
    "",
    "AWS Tutorial Series - Really cool file attachment!",
    "",
    "--NextPart--",
  ].join("\n");

  const command = new SendRawEmailCommand({
    RawMessage: { Data: Buffer.from(rawMessage) },
    Destinations: [to],
    Source: `'AWS Tutorial Series' <${from}>`,
  });

  return sesClient.send(command);
}
