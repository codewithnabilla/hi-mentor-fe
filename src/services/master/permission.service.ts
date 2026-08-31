import { ENDPOINTS } from "@/constants/endpoint"
import api from "../api"

export const getPermissions = async (page = 1) => {
  const { data } = await api.get(ENDPOINTS.MASTER.PERMISSION, {
    params: { page },
  });
  return data;
}

export const getAllPermissions = async () => {
  const { data } = await api.get(ENDPOINTS.MASTER.PERMISSION, {
    params: { per_page: 1000 },
  });

  return data;
};

export const getPermission = async (uuid: string) => {
  const { data } = await api.get(`${ENDPOINTS.MASTER.PERMISSION}/${uuid}`);
  return data;
};

export const createPermission = async (payload: any) => {
  const { data } = await api.post(ENDPOINTS.MASTER.PERMISSION, payload);
  return data;
};

export const updatePermission = async ({
  uuid,
  payload,
}: {
  uuid: string;
  payload: any;
}) => {
  const { data } = await api.put(`${ENDPOINTS.MASTER.PERMISSION}/${uuid}`, payload);
  return data;
};

export const deletePermission = async (uuid: string) => {
  const { data } = await api.delete(`${ENDPOINTS.MASTER.PERMISSION}/${uuid}`);
  return data;
};
