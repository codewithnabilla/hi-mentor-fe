import { ENDPOINTS } from "@/constants/endpoint";
import api from "../api";

export const getRoles = async (page = 1, search = "") => {
  const { data } = await api.get(ENDPOINTS.MASTER.ROLE, {
    params: {
      page,
      search: search || undefined,
    },
  });
  return data;
};

export const getAllRoles = async (search = "") => {
  const { data } = await api.get(ENDPOINTS.MASTER.ROLE, {
    params: {
      per_page: 1000,
      search: search || undefined,
    },
  });
  return data;
};

export const getRole = async (uuid: string) => {
  const { data } = await api.get(`${ENDPOINTS.MASTER.ROLE}/${uuid}`);
  return data;
};

export const createRole = async (payload: any) => {
  const { data } = await api.post(ENDPOINTS.MASTER.ROLE, payload);
  return data;
};

export const updateRole = async ({
  uuid,
  payload,
}: {
  uuid: string;
  payload: any;
}) => {
  const { data } = await api.put(`${ENDPOINTS.MASTER.ROLE}/${uuid}`, payload);
  return data;
};

export const deleteRole = async (uuid: string) => {
  const { data } = await api.delete(`${ENDPOINTS.MASTER.ROLE}/${uuid}`);
  return data;
};

export const assignPermissionsToRole = async ({
  roleUuid,
  permissionIds,
}: {
  roleUuid: string;
  permissionIds: string[];
}) => {
  const safePermissionIds = Array.isArray(permissionIds) ? permissionIds : [];

  const payload = {
    permissions: safePermissionIds,
    permission_ids: safePermissionIds,
  };

  const { data } = await api.put(
    `${ENDPOINTS.MASTER.ROLE}/${roleUuid}/permissions`,
    payload
  );

  return data;
};
