import {api} from "@/services/api.js";

export async function getAllCatalogs(locale, {page = 1, pageSize = 20, search} = {}) {
    const res = await api.get('catalog/all', {params: {locale, page, pageSize, search}})
    return res.data
}

export async function getAllCatalogsList(locale) {
    const pageSize = 50
    let page = 1
    let all = []

    while (true) {
        const {catalogs, pages} = await getAllCatalogs(locale, {page, pageSize})
        all = all.concat(catalogs)
        if (page >= pages) break
        page++
    }

    return all
}

export async function getCatalog(catalogId, locale) {
    const catalogs = await getAllCatalogsList(locale)
    return catalogs.find((c) => String(c.id) === String(catalogId)) ?? null
}

export async function createCatalog(data, locale) {
    const res = await api.post('catalog', data, {params: {locale}})
    return res.data
}

export async function updateCatalog(catalogId, data, locale) {
    const res = await api.put(`catalog/${catalogId}`, data, {params: {locale}})
    return res.data
}

export async function deleteCatalog(catalogId) {
    const res = await api.delete(`catalog/${catalogId}`)
    return res.data
}
