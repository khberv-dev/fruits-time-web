import { apiClient } from "@/services/api.js"

export async function getMe() {
    const res = await apiClient.get('user/me')
    return res.data
}