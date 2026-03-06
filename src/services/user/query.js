import { useQuery } from "@tanstack/react-query"
import { getMe } from "@/services/user/api.js"

export const useGetMe = () => useQuery({
    queryFn: getMe,
    queryKey: ['user'],
    retry: false
})