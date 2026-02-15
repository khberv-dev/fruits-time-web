import { apiClient } from "@/services/api.js";

export async function getProducts(page, limit) {
    const res = await apiClient.get(`product?page=${ page }&limit=${ limit }`)
    return res.data
}