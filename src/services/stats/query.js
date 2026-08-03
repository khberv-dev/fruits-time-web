import {useQuery} from "@tanstack/react-query";
import {getOrdersTrend, getRecentActivity, getStats, getUsersTrend} from "@/services/stats/api.js";
import {useResourceLocale} from "@/providers/resource-locale.jsx";

export const useGetStats = () => useQuery({
    queryKey: ['stats'],
    queryFn: getStats,
})

// Subscription titles in the feed are resolved server-side, hence the locale in the key.
export const useGetRecentActivity = () => {
    const {resourceLocale} = useResourceLocale()

    return useQuery({
        queryKey: ['stats', 'recent', resourceLocale],
        queryFn: () => getRecentActivity(resourceLocale),
    })
}

export const useGetUsersTrend = (startDate, endDate) => useQuery({
    queryKey: ['stats', 'users-trend', startDate, endDate],
    queryFn: () => getUsersTrend(startDate, endDate),
    enabled: !!startDate && !!endDate,
})

export const useGetOrdersTrend = (startDate, endDate) => useQuery({
    queryKey: ['stats', 'orders-trend', startDate, endDate],
    queryFn: () => getOrdersTrend(startDate, endDate),
    enabled: !!startDate && !!endDate,
})
