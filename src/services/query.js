import {QueryClient, useMutation, useQueryClient} from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            retry: false
        }
    }
})

export const useInfoMutation = ({queryKey, mutationFn, onSuccess, onError}) => {
    const client = useQueryClient()

    return useMutation({
        mutationFn,
        onSuccess: async (data) => {
            await client.invalidateQueries({queryKey})

            if (onSuccess) {
                onSuccess(data)
            }
        },
        onError: (error) => {
            if (onError) {
                onError(error)
            }
        }
    })
}