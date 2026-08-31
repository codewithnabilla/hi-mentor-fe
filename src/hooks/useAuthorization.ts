import { useMe } from "@/hooks/useLogin";

const SUPER_ADMIN_NAMES = new Set(["super admin", "super-admin", "superadmin"]);

type PermissionValue = string | { name?: string };

type PermissionUser = {
  name?: string;
  is_super_admin?: boolean;
  permissions?: PermissionValue[];
  roles?: Array<{
    name?: string;
    permissions?: PermissionValue[];
  }>;
};

type AuthResponse = PermissionUser & {
  user?: PermissionUser;
  data?: PermissionUser & { user?: PermissionUser };
};

const getUser = (response: AuthResponse | undefined): PermissionUser | undefined =>
  response?.user ?? response?.data?.user ?? response?.data ?? response;

const getPermissionNames = (user?: PermissionUser) => {
  if (!user) return new Set<string>();

  const names = [
    ...(user.permissions ?? []),
    ...(user.roles ?? []).flatMap((role) => role.permissions ?? []),
  ]
    .map((permission) =>
      typeof permission === "string" ? permission : permission.name
    )
    .filter((name): name is string => Boolean(name))
    .map((name) => name.toLowerCase());

  return new Set(names);
};

export const useCan = () => {
  const { data } = useMe();
  const user = getUser(data);
  const permissionNames = getPermissionNames(user);
  const isSuperAdmin =
    user?.is_super_admin === true ||
    (user?.roles ?? []).some((role) =>
      SUPER_ADMIN_NAMES.has((role.name ?? "").toLowerCase())
    );

  return (requiredPermission: string) =>
    isSuperAdmin || permissionNames.has(requiredPermission.toLowerCase());
};

export const useCanAny = () => {
  const can = useCan();
  return (...requiredPermissions: string[]) =>
    requiredPermissions.some((permission) => can(permission));
};
