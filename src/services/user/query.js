import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {getAllUsers, getMe, getUser, getUserOrders} from "@/services/user/api.js";
import {useResourceLocale} from "@/providers/resource-locale.jsx";

export const useGetMe = () => useQuery({
    queryKey: ['user', 'me'],
    queryFn: getMe,
    enabled: !!localStorage.getItem('access_token'),
})

// Returns {users, total, pages} — a different envelope from the {data, total, page,
// pageSize} the order endpoints use.
export const useGetAllUsers = ({page = 1, pageSize = 20} = {}) => useQuery({
    queryKey: ['user', 'all', page, pageSize],
    queryFn: () => getAllUsers(page, pageSize),
    placeholderData: keepPreviousData,
})

export const useGetUser = (userId) => useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
})

export const useGetUserOrders = (userId, {page = 1, pageSize = 20} = {}) => {
    const {resourceLocale} = useResourceLocale()

    return useQuery({
        queryKey: ['user', userId, 'orders', page, pageSize, resourceLocale],
        queryFn: () => getUserOrders(userId, page, pageSize, resourceLocale),
        enabled: !!userId,
        placeholderData: keepPreviousData,
    })
}
