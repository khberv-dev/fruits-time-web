import { apiClient } from "@/services/api.js"

export async function getCatalogs() {
    const res = await apiClient.get('category')
    return res.data
}

export async function getCatalogById(id) {
    const res = await apiClient.get('category/' + id)
    return res.data
}

export async function updateCatalog(id, data) {
    const res = await apiClient.put('category/' + id, data)
    return res.data
}

export async function createCatalog(data) {
    const res = await apiClient.post('category/create', data)
    return res.data
}