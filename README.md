# notifibell

Send SMS, email, and SNS notifications using AWS.

## Requirements

- Node.js 18+
- AWS credentials configured (environment variables, `~/.aws/credentials`, or IAM role)
- Verified SES email addresses and SNS topic/phone permissions as needed

## Environment variables

Create a `.env` file:

```env
AWS_REGION=us-east-1
TOPIC_ARN=arn:aws:sns:us-east-1:123456789012:your-topic
FORK_COUNT=2
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run the server with `tsx` |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run typecheck` | Type-check without emitting |
| `npm run lint` | Run ESLint |
| `npm run format` | Format source with Prettier |

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/` | Health check |
| `POST` | `/publish` | Publish a message to an SNS topic |
| `POST` | `/sms` | Send an SMS via SNS |
| `POST` | `/email` | Send a raw email via SES |
| `POST` | `/listener` | Receive SNS subscription notifications |

### SMS request body

```json
{
  "message": "Hello",
  "phone": "15551234567",
  "subject": "SenderID",
  "msgType": "Transactional"
}
```

`msgType` must be `"PROMOTIONAL"` or `"Transactional"`.

## Stack

- **Express** — HTTP server
- **@aws-sdk/client-sns** / **@aws-sdk/client-ses** — AWS SDK v3 (replaces deprecated `aws-sdk` v2)
- **TypeScript 5** + **ESLint 9** (replaces TSLint)
- **tsx** — TypeScript execution for development
