import { ENDPOINTS } from "@/constants/endpoint"
import api from "../api"

export const getDepartments = async (page = 1, search = "") => {
  const { data } = await api.get(ENDPOINTS.MASTER.DEPARTMENT, {
    params: {
      page,
      search: search ?? undefined
    }
  })
  return data
}

export const getAllDepartments = async (search = "") => {
  const { data } = await api.get(ENDPOINTS.MASTER.DEPARTMENT, {
    params: {
      per_page: -1,
      search: search ?? undefined
    }
  })
  return data
}

export const getDepartment = async (uuid: string) => {
  const { data } = await api.get(`${ENDPOINTS.MASTER.DEPARTMENT}/${uuid}`)
  return data
}

export const createDepartment = async (payload: any) => {
  const { data } = await api.post(ENDPOINTS.MASTER.DEPARTMENT, payload)
  return data
}

export const updateDepartment = async ({
  uuid,
  payload
}: {
  uuid: string;
  payload: any
}) => {
  const { data } = await api.put(`${ENDPOINTS.MASTER.DEPARTMENT}/${uuid}`, payload)
  return data
}

export const deleteDepartment = async (uuid: string) => {
  const { data } = await api.delete(`${ENDPOINTS.MASTER.DEPARTMENT}/${uuid}`)
  return data
}