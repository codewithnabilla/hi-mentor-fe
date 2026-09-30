export interface Career {
  uuid: string;
  name: string;
  code: string;
  description: string | null;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export type CareerPayload = Omit<Career, "uuid" | "created_at" | "updated_at">;