import { apiClient } from "@/services/api.js";

export async function getProducts(page, limit) {
    const res = await apiClient.get(`product?page=${ page }&limit=${ limit }`)
    return res.data
}

export async function createProduct(data) {
    const res = await apiClient.post('product/create', data)
    return res.data
}

export async function updateProduct(id, data) {
    const res = await apiClient.put(`product/${ id }`, data)
    return res.data
}