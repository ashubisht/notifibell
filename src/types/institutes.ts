export type InstituteSource = "google" | "justdial";
export type OutreachChannel = "sms" | "email";

export interface InstituteSearchRequest {
  city: string;
  sources?: InstituteSource[];
}

export interface InstituteRecord {
  name: string;
  city: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  rating: string;
  source: "Google Places" | "JustDial";
  google_maps_url: string;
  justdial_url: string;
  status: string;
}

export interface InstituteSearchResponse {
  city: string;
  validatedCity: string;
  count: number;
  institutes: InstituteRecord[];
  stats: {
    googleCount: number;
    justdialCount: number;
    normalizedCount: number;
    mergedDuplicates: number;
    filteredCount: number;
    uniqueCount: number;
    sources: InstituteRecord["source"][];
    errors: string[];
  };
}

export interface OutreachSmsConfig {
  message: string;
  subject: string;
  msgType: "Promotional" | "Transactional";
}

export interface OutreachEmailConfig {
  subject: string;
  body: string;
}

export interface InstituteOutreachRequest {
  city: string;
  sources?: InstituteSource[];
  channels: OutreachChannel[];
  sms?: OutreachSmsConfig;
  email?: OutreachEmailConfig;
  limit?: number;
}

export interface OutreachDeliveryResult {
  institute: string;
  channel: OutreachChannel;
  recipient: string;
  status: "sent" | "skipped" | "failed";
  messageId?: string;
  reason?: string;
}

export interface InstituteOutreachResponse {
  city: string;
  validatedCity: string;
  institutesFound: number;
  deliveries: OutreachDeliveryResult[];
}
