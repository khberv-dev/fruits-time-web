import { apiClient } from "@/services/api.js";

export async function signIn(data) {
    const res = await apiClient.post('auth/sign-in', data)
    return res.data
}