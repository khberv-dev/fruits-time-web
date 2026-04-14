import {useQuery} from "@tanstack/react-query";
import {getAllProducts, getProduct, createProduct, updateProduct, deleteProduct} from "@/services/product/api.js";
import {useInfoMutation} from "@/services/query.js";
import {useResourceLocale} from "@/providers/resource-locale.jsx";

export const useGetAllProducts = (catalogId) => {
    const {resourceLocale} = useResourceLocale()

    return useQuery({
        queryKey: ['product', 'all', catalogId, resourceLocale],
        queryFn: () => getAllProducts(catalogId, resourceLocale),
        enabled: !!catalogId,
    })
}

export const useCreateProduct = () => useInfoMutation({
    queryKey: ['product'],
    mutationFn: ({catalogId, data, resource_locale}) => createProduct(catalogId, data, resource_locale),
})

export const useGetProduct = (catalogId, productId, locale) => useQuery({
    queryKey: ['product', catalogId, productId, locale],
    queryFn: () => getProduct(catalogId, productId, locale),
    enabled: !!catalogId && !!productId && !!locale,
})

export const useUpdateProduct = () => useInfoMutation({
    queryKey: ['product'],
    mutationFn: ({catalogId, productId, data, resource_locale}) => updateProduct(catalogId, productId, data, resource_locale),
})

export const useDeleteProduct = () => useInfoMutation({
    queryKey: ['product'],
    mutationFn: ({catalogId, productId}) => deleteProduct(catalogId, productId),
})
