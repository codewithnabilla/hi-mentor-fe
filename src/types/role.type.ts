import type { Permission } from "@/types/permission.type";

export interface Role {
  uuid: string;
  name: string;
  guard_name: string;
  description: string | null;
  permissions?: Permission[];
  created_at?: string;
  updated_at?: string;
}

export interface RolePageLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface RolePaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: RolePageLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface RolePaginationResponse {
  data: Role[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: RolePaginationMeta;
}

export interface RolePermissionAssignmentPayload {
  permissions: string[];
  permission_ids?: string[];
}

export type RolePayload = Omit<Role, "uuid" | "created_at" | "updated_at" | "permissions">;
