import { useQuery } from "@tanstack/react-query"
import { createProduct, getProductById, getProducts, updateProduct } from "@/services/product/api.js"
import { useInfoMutation } from "@/services/query.js"

export const useGetProducts = (categoryId) => useQuery({
    queryFn: () => getProducts(categoryId ? { category: categoryId } : undefined),
    queryKey: ['products', categoryId || null]
})

export const useGetProductById = (id) => useQuery({
    queryFn: () => getProductById(id),
    queryKey: ['product-' + id],
    enabled: Boolean(id) && id !== 'new'
})

export const useUpdateProduct = (id) => useInfoMutation({
    mutationFn: (data) => updateProduct(id, data),
    queryKey: ['product-' + id]
})

export const useCreateProduct = () => useInfoMutation({
    mutationFn: (data) => createProduct(data),
    queryKey: ['products']
})

