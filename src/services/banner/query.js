import {useQuery} from "@tanstack/react-query";
import {getAllBanners, getBanner, createBanner, updateBanner} from "@/services/banner/api.js";
import {useInfoMutation} from "@/services/query.js";
import {useResourceLocale} from "@/providers/resource-locale.jsx";

export const useGetAllBanners = () => {
    const {resourceLocale} = useResourceLocale()

    return useQuery({
        queryKey: ['banner', 'all', resourceLocale],
        queryFn: () => getAllBanners(resourceLocale),
    })
}

export const useGetBanner = (bannerId, locale) => useQuery({
    queryKey: ['banner', bannerId, locale],
    queryFn: () => getBanner(bannerId, locale),
    enabled: !!bannerId && !!locale,
})

export const useCreateBanner = () => useInfoMutation({
    queryKey: ['banner'],
    mutationFn: ({data, locale}) => createBanner(data, locale),
})

export const useUpdateBanner = () => useInfoMutation({
    queryKey: ['banner'],
    mutationFn: ({bannerId, data, locale}) => updateBanner(bannerId, data, locale),
})
