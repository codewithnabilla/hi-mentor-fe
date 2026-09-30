import { ENDPOINTS } from "@/constants/endpoint";
import type { SkillPayload } from "@/types/skill.type";
import api from "../api";

export const getSkills = async (page = 1, search = "") => {
  const { data } = await api.get(ENDPOINTS.MASTER.SKILL, {
    params: { page, search: search || undefined },
  });
  return data;
};

export const getAllSkills = async (search = "") => {
  const { data } = await api.get(ENDPOINTS.MASTER.SKILL, {
    params: { per_page: -1, search: search || undefined },
  });
  return data;
};

export const getSkill = async (uuid: string) => {
  const { data } = await api.get(`${ENDPOINTS.MASTER.SKILL}/${uuid}`);
  return data;
};

export const createSkill = async (payload: SkillPayload) => {
  const { data } = await api.post(ENDPOINTS.MASTER.SKILL, payload);
  return data;
};

export const updateSkill = async ({ uuid, payload }: { uuid: string; payload: SkillPayload }) => {
  const { data } = await api.put(`${ENDPOINTS.MASTER.SKILL}/${uuid}`, payload);
  return data;
};

export const deleteSkill = async (uuid: string) => {
  const { data } = await api.delete(`${ENDPOINTS.MASTER.SKILL}/${uuid}`);
  return data;
};