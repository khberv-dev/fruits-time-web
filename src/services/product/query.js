import {keepPreviousData, useQueries, useQuery} from "@tanstack/react-query";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getAllProductsList,
    getProduct,
    updateProduct,
} from "@/services/product/api.js";
import {useInfoMutation} from "@/services/query.js";
import {useResourceLocale} from "@/providers/resource-locale.jsx";

export const useGetAllProducts = (catalogId, {page = 1, pageSize = 20, search} = {}) => {
    const {resourceLocale} = useResourceLocale()

    return useQuery({
        queryKey: ['product', 'all', catalogId, resourceLocale, page, pageSize, search],
        queryFn: () => getAllProducts(catalogId, resourceLocale, {page, pageSize, search}),
        enabled: !!catalogId,
        placeholderData: keepPreviousData,
    })
}

export const useGetAllProductsAcrossCatalogs = (catalogIds = []) => {
    const {resourceLocale} = useResourceLocale()

    const results = useQueries({
        queries: catalogIds.map((catalogId) => ({
            queryKey: ['product', 'all-list', catalogId, resourceLocale],
            queryFn: () => getAllProductsList(catalogId, resourceLocale),
            enabled: !!catalogId,
        }))
    })

    return {
        data: results.flatMap((r) => r.data ?? []),
        isLoading: results.some((r) => r.isLoading),
    }
}

export const useCreateProduct = () => useInfoMutation({
    queryKey: ['product'],
    mutationFn: ({catalogId, data, locale}) => createProduct(catalogId, data, locale),
})

export const useGetProduct = (catalogId, productId, locale) => useQuery({
    queryKey: ['product', catalogId, productId, locale],
    queryFn: () => getProduct(catalogId, productId, locale),
    enabled: !!catalogId && !!productId && !!locale,
})

export const useUpdateProduct = () => useInfoMutation({
    queryKey: ['product'],
    mutationFn: ({catalogId, productId, data, locale}) => updateProduct(catalogId, productId, data, locale),
})

export const useDeleteProduct = () => useInfoMutation({
    queryKey: ['product'],
    mutationFn: ({catalogId, productId}) => deleteProduct(catalogId, productId),
})
