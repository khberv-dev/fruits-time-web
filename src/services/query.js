import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAlert } from "@/providers/alert/useAlert.js";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        }
    }
})

export const useMutationWithAlert = ({ queryKey, mutationFn }) => {
    const client = useQueryClient()
    const alert = useAlert()

    return useMutation({
        mutationFn,
        onSuccess: (data) => {
            client.invalidateQueries(queryKey)
            alert.show('success', data.message)
        },
        onError: (error) => {
            alert.show('error', error.response.data.message.toString())
        }
    })
}