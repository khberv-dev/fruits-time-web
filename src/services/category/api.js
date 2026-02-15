import { apiClient } from "@/services/api.js";

export async function getCategories(page, limit) {
    const res = await apiClient.get(`category?page=${ page }&limit=${ limit }`)
    return res.data
}

export async function createCategory(data) {
    const res = await apiClient.post('category/create', data)
    return res.data
}

export async function updateCategory(id, data) {
    const res = await apiClient.put(`category/${ id }`, data)
    return res.data
}