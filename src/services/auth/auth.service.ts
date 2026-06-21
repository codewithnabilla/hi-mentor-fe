import api from "../api";

export interface LoginPayload {
    email: string;
    password: string
}

export const login = async (
    payload: LoginPayload
) => {
    const response = await api.post("/login", payload)
    return response.data
}

export const me = async () => {
    const response = await api.get("/me");

    return response.data;
};

export const logout = async () => {
    const response = await api.post("/logout");

    return response.data;
};