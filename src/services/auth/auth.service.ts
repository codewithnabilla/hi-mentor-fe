import { ENDPOINTS } from "@/constants/endpoint";
import api from "../api";

export interface LoginPayload {
  email: string;
  password: string
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const login = async (
  payload: LoginPayload
) => {
  const response = await api.post(ENDPOINTS.AUTH.LOGIN, payload);
  return response.data
}

export const register = async (
  payload: RegisterPayload
) => {
  const response = await api.post(ENDPOINTS.AUTH.REGISTER, payload);
  return response.data;
}

export const me = async () => {
  const response = await api.get(ENDPOINTS.AUTH.ME);
  return response.data;
};

export const logout = async () => {
  const response = await api.post(ENDPOINTS.AUTH.LOGOUT);
  return response.data;
};