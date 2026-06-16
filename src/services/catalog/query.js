import {useQuery} from "@tanstack/react-query";
import {createCatalog, deleteCatalog, getAllCatalogs, getCatalog, updateCatalog} from "@/services/catalog/api.js";
import {useInfoMutation} from "@/services/query.js";
import {useResourceLocale} from "@/providers/resource-locale.jsx";

export const useGetAllCatalogs = () => {
    const {resourceLocale} = useResourceLocale()

    return useQuery({
        queryKey: ['catalog', 'all', resourceLocale],
        queryFn: () => getAllCatalogs(resourceLocale),
    })
}

export const useCreateCatalog = () => useInfoMutation({
    queryKey: ['catalog'],
    mutationFn: ({data, locale}) => createCatalog(data, locale),
})

export const useGetCatalog = (catalogId, locale) => useQuery({
    queryKey: ['catalog', catalogId, locale],
    queryFn: () => getCatalog(catalogId, locale),
    enabled: !!catalogId && !!locale,
})

export const useUpdateCatalog = () => useInfoMutation({
    queryKey: ['catalog'],
    mutationFn: ({catalogId, data, locale}) => updateCatalog(catalogId, data, locale),
})

export const useDeleteCatalog = () => useInfoMutation({
    queryKey: ['catalog'],
    mutationFn: (catalogId) => deleteCatalog(catalogId),
})
