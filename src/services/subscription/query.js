import {useQuery} from "@tanstack/react-query";
import {
    createSubscription,
    generateSubscriptionCodes,
    getAllSubscriptions,
    getSubscription,
    getSubscriptionCodes,
    updateSubscription,
} from "@/services/subscription/api.js";
import {useInfoMutation} from "@/services/query.js";

// The admin endpoints return the raw localized objects (`title` is a `{uz, ru, en}` map),
// so the locale never reaches the query key — pages resolve the title client-side.
export const useGetAllSubscriptions = () => useQuery({
    queryKey: ['subscription', 'all'],
    queryFn: getAllSubscriptions,
})

export const useGetSubscription = (subscriptionId) => useQuery({
    queryKey: ['subscription', subscriptionId],
    queryFn: () => getSubscription(subscriptionId),
    enabled: !!subscriptionId,
})

export const useGetSubscriptionCodes = (subscriptionId) => useQuery({
    queryKey: ['subscription', subscriptionId, 'codes'],
    queryFn: () => getSubscriptionCodes(subscriptionId),
    enabled: !!subscriptionId,
})

export const useCreateSubscription = () => useInfoMutation({
    queryKey: ['subscription'],
    mutationFn: ({data, locale}) => createSubscription(data, locale),
})

export const useUpdateSubscription = () => useInfoMutation({
    queryKey: ['subscription'],
    mutationFn: ({subscriptionId, data, locale}) => updateSubscription(subscriptionId, data, locale),
})

export const useGenerateSubscriptionCodes = () => useInfoMutation({
    queryKey: ['subscription'],
    mutationFn: ({subscriptionId, count}) => generateSubscriptionCodes(subscriptionId, count),
})
