import {useQuery} from "@tanstack/react-query";
import {getStats, getUsersTrend, getOrdersTrend} from "@/services/stats/api.js";

export const useGetStats = () => useQuery({
    queryKey: ['stats'],
    queryFn: getStats,
})

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
