import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/services/user/api.js";

export const useGetMe = () => useQuery({
    queryKey: ['auth-user'],
    queryFn: getMe
})