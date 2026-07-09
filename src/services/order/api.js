import {api} from "@/services/api.js";

export async function getAdminOrders(page, pageSize, locale) {
    const res = await api.get('order/admin', {params: {page, pageSize, locale}})
    return res.data
}

export async function cancelOrder(orderId, locale) {
    const res = await api.patch(`order/${orderId}/cancel`, null, {params: {locale}})
    return res.data
}
