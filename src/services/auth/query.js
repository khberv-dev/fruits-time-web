import { useInfoMutation } from "@/services/query.js"
import { signIn } from "@/services/auth/api.js"

export const useSignIn = () => useInfoMutation({
    mutationFn: (data) => signIn(data),
    queryKey: ['user'],
    onSuccess: (data) => {
        localStorage.setItem('token', data.token)
    }
})