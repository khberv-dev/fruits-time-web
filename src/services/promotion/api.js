import { apiClient } from "@/services/api.js";

export async function getBanners() {
    const res = await apiClient.get('promotion/banners')

    return res.data
}

export async function createBanner(data) {
    const res = await apiClient.post('promotion/create-banner', data)

    return res.data
}

export async function updateBanner(id, data) {
    const res = await apiClient.put(`promotion/banner/${ id }`, data)

    return res.data
}