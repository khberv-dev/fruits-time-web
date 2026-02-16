import { useQuery } from "@tanstack/react-query";
import { createProduct, getProducts, updateProduct } from "@/services/product/api.js";
import { useMutationWithAlert } from "@/services/query.js";

export const useGetProducts = (page, limit) => useQuery({
    queryKey: ['products', page, limit],
    queryFn: () => getProducts(page, limit)
})

export const useCreateProduct = () => useMutationWithAlert({
    queryKey: ['products'],
    mutationFn: (data) => createProduct(data)
})

export const useUpdateProduct = () => useMutationWithAlert({
    queryKey: ['products'],
    mutationFn: ({ id, data }) => updateProduct(id, data)
})