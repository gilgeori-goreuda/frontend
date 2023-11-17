import { apiClient } from "./ApiClient";

export const login = (code) => apiClient.get(`/api/v1/auth/login?code=${code}`, {
    headers : {
        "Content-Type": "application/json;charset=utf-8"
    }
});