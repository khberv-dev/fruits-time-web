import {api} from "@/services/api.js";

export async function getMe() {
    const res = await api.get('user/me')
    return res.data
}

export async function getAllUsers(page, pageSize) {
    const res = await api.get('user', {params: {page, pageSize}})
    return res.data
}

export async function getUser(userId) {
    const res = await api.get(`user/${userId}`)
    return res.data
}

export async function getUserOrders(userId, page, pageSize, locale) {
    const res = await api.get(`user/${userId}/orders`, {params: {page, pageSize, locale}})
    return res.data
}
