export interface Department {
  uuid: string;
  name: string;
  code: string;
  description: string | null;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface DepartmentPageLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface DepartmentPaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: DepartmentPageLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface DepartmentPaginationResponse {
  data: Department[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: DepartmentPaginationMeta;
}

export type DepartmentPayload = Omit<
  Department,
  "uuid" | "created_at" | "updated_at"
>;
