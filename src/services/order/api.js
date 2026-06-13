import {api} from "@/services/api.js";

export async function getAdminOrders(page, pageSize, locale) {
    const res = await api.get('order/admin', {params: {page, pageSize, locale}})
    return res.data
}
