import {useQuery} from "@tanstack/react-query";
import {getAdminOrders} from "@/services/order/api.js";
import {useResourceLocale} from "@/providers/resource-locale.jsx";

export const useGetAdminOrders = (page, pageSize) => {
    const {resourceLocale} = useResourceLocale()

    return useQuery({
        queryKey: ['order', 'admin', page, pageSize, resourceLocale],
        queryFn: () => getAdminOrders(page, pageSize, resourceLocale),
    })
}
