import {useEffect} from "react";
import {useNavigate} from "react-router";
import {useGetAllBranches, useSyncBranches} from "@/services/branch/query.js";
import {useHeader} from "@/providers/header.jsx";
import {Button} from "@gravity-ui/uikit";
import {ArrowRotateLeft} from "@gravity-ui/icons";
import BranchCard from "@/ui/components/branch-card/index.jsx";
import s from "./main.module.css";

export default function BranchPage() {
    const navigate = useNavigate()
    const {data: branches = [], isLoading} = useGetAllBranches()
    const {mutate: syncBranches, isPending: isSyncing} = useSyncBranches()
    const {setHeader} = useHeader()

    useEffect(() => {
        setHeader({title: 'Filiallar'})
    }, [])

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
                        onEdit={() => navigate(`/branch/${branch.id}/edit`, {state: {branch}})}
                    />
                ))}
            </div>
        </div>
    )
}
