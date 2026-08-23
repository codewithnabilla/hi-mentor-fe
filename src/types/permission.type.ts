export interface Permission {
  uuid: string;
  name: string;
  guard_name: string;
  description: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface PermissionPageLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface PermissionPaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: PermissionPageLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface PermissionPaginationResponse {
  data: Permission[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: PermissionPaginationMeta;
}

export type PermissionPayload = Omit<
  Permission,
  "uuid" | "created_at" | "updated_at"
>;
