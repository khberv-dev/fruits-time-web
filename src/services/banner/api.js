import {api} from "@/services/api.js";

export async function getAllBanners(locale) {
    const res = await api.get('banner/all', {params: {locale}})
    return res.data
}

export async function getBanner(bannerId, locale) {
    const res = await api.get('banner/all', {params: {locale}})
    return res.data.find((b) => String(b.id) === String(bannerId)) ?? null
}

export async function createBanner(data, locale) {
    const res = await api.post('banner', data, {params: {locale}})
    return res.data
}

export async function updateBanner(bannerId, data, locale) {
    const res = await api.put(`banner/${bannerId}`, data, {params: {locale}})
    return res.data
}
