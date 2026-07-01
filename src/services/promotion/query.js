import {useQuery} from "@tanstack/react-query";
import {getAllPromotions, updatePromotion} from "@/services/promotion/api.js";
import {useInfoMutation} from "@/services/query.js";

export const useGetAllPromotions = () => useQuery({
    queryKey: ['promotion', 'all'],
    queryFn: getAllPromotions,
})

export const useUpdatePromotion = () => useInfoMutation({
    queryKey: ['promotion'],
    mutationFn: ({promotionId, isActive}) => updatePromotion(promotionId, isActive),
})
