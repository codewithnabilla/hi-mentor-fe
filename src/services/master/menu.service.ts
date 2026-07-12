import { ENDPOINTS } from "@/constants/endpoint"
import api from "../api"

export const getMenus = async () => {
  const { data } = await api.get(ENDPOINTS.MASTER.MENU);
  return data;
}

export const getMenu = async (uuid: string) => {
  const { data } = await api.get(`${ENDPOINTS.MASTER.MENU}/${uuid}`);
  return data;
};

export const createMenu = async (payload: any) => {
  const { data } = await api.post(ENDPOINTS.MASTER.MENU, payload);
  return data;
};

export const updateMenu = async ({
  uuid,
  payload,
}: {
  uuid: string;
  payload: any;
}) => {
  const { data } = await api.put(`${ENDPOINTS.MASTER.MENU}/${uuid}`, payload);
  return data;
};

export const deleteMenu = async (uuid: string) => {
  const { data } = await api.delete(`${ENDPOINTS.MASTER.MENU}/${uuid}`);
  return data;
};
