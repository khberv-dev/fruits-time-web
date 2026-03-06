import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { useAlert } from "@/providers/alert/context.js"

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false
        }
    }
})

export function useInfoMutation({ mutationFn, queryKey, onSuccess, onError }) {
    const client = useQueryClient()
    const alert = useAlert()

    return useMutation({
        mutationFn,
        onSuccess: (data) => {
            if (onSuccess) {
                onSuccess(data)
            }

            client.invalidateQueries({ queryKey })

            alert.show(data.message, 'success')
        },
        onError: (error) => {
            if (error.response && error.response.data.message) {
                if (onError) {
                    onError(error)
                }

                alert.show(error.response.data.message, 'error')
            } else {
                alert.show(error.toString())
            }
        }
    })
}