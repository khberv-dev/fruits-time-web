import {api} from "@/services/api.js";

export async function getAllPromotions() {
    const res = await api.get('promotion')
    return res.data
}

export async function updatePromotion(promotionId, data) {
    const res = await api.patch(`promotion/${promotionId}`, data)
    return res.data
}
