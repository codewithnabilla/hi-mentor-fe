import { ENDPOINTS } from "@/constants/endpoint";
import type { CareerPayload } from "@/types/career.type";
import api from "../api";

export const getCareers = async (page = 1, search = "") => {
  const { data } = await api.get(ENDPOINTS.MASTER.CAREER, {
    params: { page, search: search || undefined },
  });
  return data;
};

export const getAllCareers = async (search = "") => {
  const { data } = await api.get(ENDPOINTS.MASTER.CAREER, {
    params: { per_page: -1, search: search || undefined },
  });
  return data;
};

export const getCareer = async (uuid: string) => {
  const { data } = await api.get(`${ENDPOINTS.MASTER.CAREER}/${uuid}`);
  return data;
};

export const createCareer = async (payload: CareerPayload) => {
  const { data } = await api.post(ENDPOINTS.MASTER.CAREER, payload);
  return data;
};

export const updateCareer = async ({ uuid, payload }: { uuid: string; payload: CareerPayload }) => {
  const { data } = await api.put(`${ENDPOINTS.MASTER.CAREER}/${uuid}`, payload);
  return data;
};

export const deleteCareer = async (uuid: string) => {
  const { data } = await api.delete(`${ENDPOINTS.MASTER.CAREER}/${uuid}`);
  return data;
};