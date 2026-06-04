import {useQuery} from "@tanstack/react-query";
import {getAllBranches, getStorages, syncBranches, updateBranch} from "@/services/branch/api.js";
import {useInfoMutation} from "@/services/query.js";

export const useGetAllBranches = () => useQuery({
    queryKey: ['branch', 'all'],
    queryFn: getAllBranches,
})

export const useGetStorages = () => useQuery({
    queryKey: ['branch', 'storages'],
    queryFn: getStorages,
})

export const useSyncBranches = () => useInfoMutation({
    queryKey: ['branch'],
    mutationFn: syncBranches,
})

export const useUpdateBranch = () => useInfoMutation({
    queryKey: ['branch'],
    mutationFn: ({id, data}) => updateBranch(id, data),
})
