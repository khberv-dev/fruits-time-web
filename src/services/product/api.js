import {api} from "@/services/api.js";

export async function getAllProducts(catalogId, locale) {
    const res = await api.get(`${catalogId}/product/all`, {params: {locale}})
    return res.data
}

export async function getProduct(catalogId, productId, locale) {
    const res = await api.get(`${catalogId}/product/all`, {params: {locale}})
    return res.data.find((p) => String(p.id) === String(productId)) ?? null
}

export async function createProduct(catalogId, data, resource_locale) {
    const res = await api.post(`${catalogId}/product`, data, {params: {resource_locale}})
    return res.data
}

export async function updateProduct(catalogId, productId, data, resource_locale) {
    const res = await api.put(`${catalogId}/product/${productId}`, data, {params: {resource_locale}})
    return res.data
}

export async function deleteProduct(catalogId, productId) {
    const res = await api.delete(`${catalogId}/product/${productId}`)
    return res.data
}
