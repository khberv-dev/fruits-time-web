import {useEffect, useState} from "react";
import {useGetAllBranches, useGetStorages, useSyncBranches, useUpdateBranch} from "@/services/branch/query.js";
import {useHeader} from "@/providers/header.jsx";
import {Button} from "@gravity-ui/uikit";
import {ArrowRotateLeft} from "@gravity-ui/icons";
import BranchCard from "@/ui/components/branch-card/index.jsx";
import BindStorageDialog from "@/ui/components/bind-storage-dialog/index.jsx";
import s from "./main.module.css";

export default function BranchPage() {
    const {data: branches = [], isLoading} = useGetAllBranches()
    const {data: storages = []} = useGetStorages()
    const {mutate: syncBranches, isPending: isSyncing} = useSyncBranches()
    const {mutate: updateBranch, isPending: isUpdating} = useUpdateBranch()
    const {setHeader} = useHeader()

    const [bindingBranch, setBindingBranch] = useState(null)

    useEffect(() => {
        setHeader({title: 'Filiallar'})
    }, [])

    const handleBindStorage = (storageId) => {
        updateBranch(
            {id: bindingBranch.id, data: {storageId}},
            {onSuccess: () => setBindingBranch(null)}
        )
    }

    if (isLoading) return null

    return (
        <div className={s.root}>
            <div>
                <Button view="outlined" size="l" loading={isSyncing} onClick={() => syncBranches()}>
                    <Button.Icon><ArrowRotateLeft/></Button.Icon>
                    Sinxronlashtirish
                </Button>
            </div>
            <div className={s.grid}>
                {branches.map((branch) => (
                    <BranchCard
                        key={branch.id}
                        branch={branch}
                        onBindStorage={() => setBindingBranch(branch)}
                    />
                ))}
            </div>

            <BindStorageDialog
                open={!!bindingBranch}
                branch={bindingBranch}
                storages={storages}
                loading={isUpdating}
                onConfirm={handleBindStorage}
                onClose={() => setBindingBranch(null)}
            />
        </div>
    )
}
