import {api} from "@/services/api.js";

export async function getStats() {
    const res = await api.get('stats')
    return res.data
}

export async function getUsersTrend(startDate, endDate) {
    const res = await api.get('stats/users-trend', {params: {startDate, endDate}})
    return res.data
}

export async function getOrdersTrend(startDate, endDate) {
    const res = await api.get('stats/orders-trend', {params: {startDate, endDate}})
    return res.data
}
