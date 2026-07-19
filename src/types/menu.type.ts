export interface Menu {
    uuid: string;
    name: string;
    route: string;
    icon: string | null;
    parent_uuid: string | null;
    order: number;
    permission: string | null;
    is_active: boolean;
    children: Menu[];
}

export type MenuPayload = Omit<
    Menu,
    "uuid" | "children"
>;