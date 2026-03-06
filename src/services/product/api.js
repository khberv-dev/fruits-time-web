import { apiClient } from "@/services/api.js"

export async function getProducts() {
    const res = await apiClient.get('product')
    return res.data
}

export async function getProductById(id) {
    const res = await apiClient.get('product/' + id)
    return res.data
}

export async function updateProduct(id, data) {
    const res = await apiClient.put('product/' + id, data)
    return res.data
}

export async function createProduct(data) {
    const res = await apiClient.post('product/create', data)
    return res.data
}

