import {api} from "@/services/api.js";

export async function getAllCatalogs(locale) {
    const res = await api.get('catalog/all', {params: {locale}})
    return res.data
}

export async function getCatalog(catalogId, locale) {
    const res = await api.get('catalog/all', {params: {locale}})
    return res.data.find((c) => String(c.id) === String(catalogId)) ?? null
}

export async function createCatalog(data, resource_locale) {
    const res = await api.post('catalog', data, {params: {resource_locale}})
    return res.data
}

export async function updateCatalog(catalogId, data, resource_locale) {
    const res = await api.put(`catalog/${catalogId}`, data, {params: {resource_locale}})
    return res.data
}

export async function deleteCatalog(catalogId) {
    const res = await api.delete(`catalog/${catalogId}`)
    return res.data
}
