import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/product/api.js";

export const useGetProducts = (page, limit) => useQuery({
    queryKey: ['products', page, limit],
    queryFn: () => getProducts(page, limit)
})