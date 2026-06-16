import {useMutation, useQuery} from "@tanstack/react-query"
import {askAdvisor, getAdvisorHistory} from "@/services/advisor/api.js"
import {toaster} from "@/services/toaster.js"

export const useGetAdvisorHistory = () =>
    useQuery({
        queryKey: ['advisor', 'history'],
        queryFn: getAdvisorHistory,
    })

export const useAskAdvisor = ({onSuccess} = {}) =>
    useMutation({
        mutationFn: askAdvisor,
        onSuccess,
        onError: (error) => {
            const message = error?.response?.data?.message ?? error?.message
            if (message) {
                toaster.add({
                    name: `advisor-error-${Date.now()}`,
                    content: Array.isArray(message) ? message.join(', ') : message,
                    theme: 'danger',
                    timeout: 5000,
                })
            }
        },
    })
