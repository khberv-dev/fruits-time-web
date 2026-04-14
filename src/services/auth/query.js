import {useInfoMutation} from "@/services/query.js";
import {signIn} from "@/services/auth/api.js";

export const useSignIn = () => useInfoMutation({
    queryKey: ['user'],
    mutationFn: (data) => signIn(data),
    onSuccess: (data) => {
        const {accessToken, refreshToken} = data

        localStorage.setItem('access_token', accessToken)
        localStorage.setItem('refresh_token', refreshToken)
    }
})