import { config as loadEnv } from "dotenv";

loadEnv();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const config = {
  port: parseInt(process.env.PORT ?? "3000", 10),
  aws: {
    region: process.env.AWS_REGION ?? "us-east-1",
    topicArn: process.env.TOPIC_ARN,
  },
  email: {
    from: process.env.SES_FROM_EMAIL,
    to: process.env.SES_TO_EMAIL,
  },
  cluster: {
    forkCount:
      process.env.FORK_COUNT !== undefined ? parseInt(process.env.FORK_COUNT, 10) : undefined,
  },
} as const;

export function getTopicArn(): string {
  return requireEnv("TOPIC_ARN");
}

export function getEmailAddresses(): { from: string; to: string } {
  return {
    from: requireEnv("SES_FROM_EMAIL"),
    to: requireEnv("SES_TO_EMAIL"),
  };
}
