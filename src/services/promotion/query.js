import { useQuery } from "@tanstack/react-query";
import { createBanner, getBanners, updateBanner } from "@/services/promotion/api.js";
import { useMutationWithAlert } from "@/services/query.js";

export const useGetBanners = () => useQuery({
    queryKey: ['banners'],
    queryFn: getBanners
})

export const useCreateBanner = () => useMutationWithAlert({
    queryKey: ['banners'],
    mutationFn: (data) => createBanner(data)
})

export const useUpdateBanner = () => useMutationWithAlert({
    queryKey: ['banners'],
    mutationFn: ({ id, data }) => updateBanner(id, data)
})