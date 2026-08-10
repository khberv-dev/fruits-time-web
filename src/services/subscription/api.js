import {api} from "@/services/api.js";

export async function getAllSubscriptions() {
    const res = await api.get('subscription')
    return res.data
}

export async function getSubscription(subscriptionId) {
    const res = await api.get('subscription')
    return res.data.find((s) => String(s.id) === String(subscriptionId)) ?? null
}

export async function createSubscription(data, locale) {
    const res = await api.post('subscription', data, {params: {locale}})
    return res.data
}

export async function updateSubscription(subscriptionId, data, locale) {
    const res = await api.patch(`subscription/${subscriptionId}`, data, {params: {locale}})
    return res.data
}

export async function getSubscriptionCodes(subscriptionId) {
    const res = await api.get(`subscription/${subscriptionId}/codes`)
    return res.data
}

export async function getSubscriptionRequests(page, pageSize, status) {
    const res = await api.get('subscription/request', {params: {page, pageSize, status}})
    return res.data
}

export async function updateSubscriptionRequestStatus(requestId, status) {
    const res = await api.patch(`subscription/request/${requestId}`, {status})
    return res.data
}

export async function generateSubscriptionCodes(subscriptionId, count) {
    const res = await api.post(`subscription/${subscriptionId}/codes`, {count})
    return res.data
}
