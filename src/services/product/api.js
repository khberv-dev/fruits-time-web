import {api} from "@/services/api.js";

export async function getAllProducts(catalogId, locale, {page = 1, pageSize = 20, search} = {}) {
    const res = await api.get(`catalog/${catalogId}/product/all`, {params: {locale, page, pageSize, search}})
    return res.data
}

export async function getAllProductsList(catalogId, locale) {
    const pageSize = 50
    let page = 1
    let all = []

    while (true) {
        const {products, pages} = await getAllProducts(catalogId, locale, {page, pageSize})
        all = all.concat(products)
        if (page >= pages) break
        page++
    }

    return all
}

export async function getProduct(catalogId, productId, locale) {
    const products = await getAllProductsList(catalogId, locale)
    return products.find((p) => String(p.id) === String(productId)) ?? null
}

export async function createProduct(catalogId, data, locale) {
    const res = await api.post(`catalog/${catalogId}/product`, data, {params: {locale}})
    return res.data
}

export async function updateProduct(catalogId, productId, data, locale) {
    const res = await api.put(`catalog/${catalogId}/product/${productId}`, data, {params: {locale}})
    return res.data
}

export async function deleteProduct(catalogId, productId) {
    const res = await api.delete(`catalog/${catalogId}/product/${productId}`)
    return res.data
}
