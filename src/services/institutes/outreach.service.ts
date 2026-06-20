import { HttpError } from "../../middleware/httpError";
import type {
  InstituteOutreachRequest,
  InstituteOutreachResponse,
  OutreachDeliveryResult,
} from "../../types/institutes";
import { sendTemplatedEmail } from "../email/email.service";
import { sendSms } from "../sms/sms.service";
import { searchCoachingInstitutes } from "./institute.service";

function validateOutreachRequest(request: InstituteOutreachRequest): void {
  if (!request.city?.trim()) {
    throw new HttpError("City name is required");
  }

  if (!request.channels?.length) {
    throw new HttpError("At least one outreach channel is required");
  }

  if (request.channels.includes("sms") && !request.sms) {
    throw new HttpError("SMS configuration is required when the sms channel is enabled");
  }

  if (request.channels.includes("email") && !request.email) {
    throw new HttpError("Email configuration is required when the email channel is enabled");
  }
}

export async function runInstituteOutreach(
  request: InstituteOutreachRequest
): Promise<InstituteOutreachResponse> {
  validateOutreachRequest(request);

  const search = await searchCoachingInstitutes({
    city: request.city,
    sources: request.sources,
  });

  const limit = request.limit ?? search.institutes.length;
  const institutes = search.institutes.slice(0, limit);
  const deliveries: OutreachDeliveryResult[] = [];

  for (const institute of institutes) {
    if (request.channels.includes("sms") && request.sms) {
      if (!institute.phone) {
        deliveries.push({
          institute: institute.name,
          channel: "sms",
          recipient: "",
          status: "skipped",
          reason: "No phone number available",
        });
      } else {
        try {
          const result = await sendSms({
            message: request.sms.message,
            phone: `91${institute.phone}`,
            subject: request.sms.subject,
            msgType: request.sms.msgType,
          });

          deliveries.push({
            institute: institute.name,
            channel: "sms",
            recipient: institute.phone,
            status: "sent",
            messageId: result.MessageId,
          });
        } catch (error) {
          deliveries.push({
            institute: institute.name,
            channel: "sms",
            recipient: institute.phone,
            status: "failed",
            reason: error instanceof Error ? error.message : "SMS delivery failed",
          });
        }
      }
    }

    if (request.channels.includes("email") && request.email) {
      if (!institute.email) {
        deliveries.push({
          institute: institute.name,
          channel: "email",
          recipient: "",
          status: "skipped",
          reason: "No email address available",
        });
      } else {
        try {
          const result = await sendTemplatedEmail({
            to: institute.email,
            subject: request.email.subject,
            body: request.email.body,
          });

          deliveries.push({
            institute: institute.name,
            channel: "email",
            recipient: institute.email,
            status: "sent",
            messageId: result.MessageId,
          });
        } catch (error) {
          deliveries.push({
            institute: institute.name,
            channel: "email",
            recipient: institute.email,
            status: "failed",
            reason: error instanceof Error ? error.message : "Email delivery failed",
          });
        }
      }
    }
  }

  return {
    city: search.city,
    validatedCity: search.validatedCity,
    institutesFound: search.count,
    deliveries,
  };
}
