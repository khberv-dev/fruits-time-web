import { useQuery } from "@tanstack/react-query";
import { createCategory, getCategories, updateCategory } from "@/services/category/api.js";
import { useMutationWithAlert } from "@/services/query.js";

export const useGetCategories = (page, limit) => useQuery({
    queryKey: ['categories', page, limit],
    queryFn: () => getCategories(page, limit)
})

export const useCreateCategory = () => useMutationWithAlert({
    queryKey: ['categories'],
    mutationFn: (data) => createCategory(data)
})

export const useUpdateCategory = () => useMutationWithAlert({
    queryKey: ['categories'],
    mutationFn: ({ id, data }) => updateCategory(id, data)
})