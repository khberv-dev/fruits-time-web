import {api} from "@/services/api.js";

export async function getAllBranches() {
    const res = await api.get('branch')
    return res.data
}

export async function syncBranches() {
    const res = await api.post('branch/sync')
    return res.data
}

export async function getStorages() {
    const res = await api.get('branch/storages')
    return res.data
}

export async function updateBranch(id, data) {
    const res = await api.patch(`branch/${id}`, data)
    return res.data
}
