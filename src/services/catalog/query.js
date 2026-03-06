import { useQuery } from "@tanstack/react-query"
import { createCatalog, getCatalogById, getCatalogs, updateCatalog } from "@/services/catalog/api.js"
import { useInfoMutation } from "@/services/query.js"

export const useGetCatalogs = () => useQuery({
    queryFn: getCatalogs,
    queryKey: ['catalogs']
})

export const useGetCatalogById = (id) => useQuery({
    queryFn: () => getCatalogById(id),
    queryKey: ['catalog-' + id],
    enabled: Boolean(id) && id !== 'new'
})

export const useUpdateCatalog = (id) => useInfoMutation({
    mutationFn: (data) => updateCatalog(id, data),
    queryKey: ['catalog-' + id]
})

export const useCreateCatalog = () => useInfoMutation({
    mutationFn: (data) => createCatalog(data),
    queryKey: ['catalogs']
})