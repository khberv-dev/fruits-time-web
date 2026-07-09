import {useQuery} from "@tanstack/react-query";
import {cancelOrder, getAdminOrders} from "@/services/order/api.js";
import {useInfoMutation} from "@/services/query.js";
import {useResourceLocale} from "@/providers/resource-locale.jsx";

export const useGetAdminOrders = (page, pageSize) => {
    const {resourceLocale} = useResourceLocale()

    return useQuery({
        queryKey: ['order', 'admin', page, pageSize, resourceLocale],
        queryFn: () => getAdminOrders(page, pageSize, resourceLocale),
    })
}

export const useCancelOrder = () => {
    const {resourceLocale} = useResourceLocale()

    return useInfoMutation({
        queryKey: ['order'],
        mutationFn: (orderId) => cancelOrder(orderId, resourceLocale),
    })
}
