export interface SmsMessage {
  message: string;
  phone: string;
  subject: string;
  msgType: "Promotional" | "Transactional";
}
