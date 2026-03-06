import { useQuery } from "@tanstack/react-query"
import { createBanner, getBanners, updateBanner } from "@/services/banner/api.js"
import { useInfoMutation } from "@/services/query.js"

export const useGetBanners = () => useQuery({
    queryFn: getBanners,
    queryKey: ['banners']
})

export const useCreateBanner = () => useInfoMutation({
    mutationFn: (data) => createBanner(data),
    queryKey: ['banners']
})

export const useUpdateBanner = (id) => useInfoMutation({
    mutationFn: (data) => updateBanner(id, data),
    queryKey: ['banners']
})

