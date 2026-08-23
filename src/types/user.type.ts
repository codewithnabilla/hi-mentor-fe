export interface User {
    uuid: string;
    name: string;
    email: string;
    created_at?: string;
    updated_at?: string;
}

export interface UserPageLink {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
}

export interface UserPaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: UserPageLink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface UserPaginationResponse {
    data: User[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: UserPaginationMeta;
}

export type UserPayload = Omit<
    User,
    "uuid" | "created_at" | "updated_at"
>;
