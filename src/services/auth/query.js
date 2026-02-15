import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "@/services/auth/api.js";
import { useAlert } from "@/providers/alert/useAlert.js";

export const useSignIn = () => {
    const client = useQueryClient()
    const {show} = useAlert()

    return useMutation({
        mutationFn: (data) => signIn(data),
        onSuccess: (data) => {
            client.invalidateQueries({ queryKey: ['user'] })
            localStorage.setItem('token', data.token)
            location.replace('/')
        },
        onError: (error) => {
            show('error', error.response.data.message)
        }
    })
}