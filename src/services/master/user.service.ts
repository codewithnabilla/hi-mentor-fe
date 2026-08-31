import { ENDPOINTS } from "@/constants/endpoint"
import api from "../api"

export const getUsers = async (page = 1, search = "") => {
  const { data } = await api.get(ENDPOINTS.MASTER.USER, {
    params: {
      page,
      search: search || undefined,
    },
  });
  return data;
}

export const getUser = async (uuid: string) => {
  const { data } = await api.get(`${ENDPOINTS.MASTER.USER}/${uuid}`);
  return data;
};

// export const createUser = async (payload: any) => {
//   const { data } = await api.post(ENDPOINTS.MASTER.USER, payload);
//   return data;
// };

export const updateUser = async ({
  uuid,
  payload,
}: {
  uuid: string;
  payload: any;
}) => {
  const { data } = await api.put(`${ENDPOINTS.MASTER.USER}/${uuid}`, payload);
  return data;
};

export const deleteUser = async (uuid: string) => {
  const { data } = await api.delete(`${ENDPOINTS.MASTER.USER}/${uuid}`);
  return data;
};
