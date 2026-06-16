import {useEffect} from "react";
import {useNavigate} from "react-router";
import {Button, Label, Table, Text} from "@gravity-ui/uikit";
import {ArrowRotateLeft, Pencil} from "@gravity-ui/icons";
import {useGetAllBranches, useSyncBranches} from "@/services/branch/query.js";
import {useHeader} from "@/providers/header.jsx";
import s from "./main.module.css";

const COLUMNS = (navigate) => [
    {
        id: 'name',
        name: 'Nomi',
        template: (branch) => (
            <Text variant="body-2">{branch.name}</Text>
        ),
    },
    {
        id: 'status',
        name: 'Holat',
        width: 160,
        template: (branch) => (
            <div className={s.labels}>
                <Label theme={branch.isWorking ? 'success' : 'danger'} size="s">
                    {branch.isWorking ? 'Ochiq' : 'Yopiq'}
                </Label>
                <Label theme={branch.isActive ? 'info' : 'default'} size="s">
                    {branch.isActive ? 'Faol' : 'Nofaol'}
                </Label>
            </div>
        ),
    },
    {
        id: 'storage',
        name: 'Ombor',
        width: 160,
        template: (branch) => (
            <Label theme={branch.storageId ? 'info' : 'warning'} size="s">
                {branch.storageId ? 'Biriktirilgan' : 'Yo\'q'}
            </Label>
        ),
    },
    {
        id: 'hours',
        name: 'Ish vaqti',
        width: 120,
        template: (branch) => (
            <Text variant="body-2" color="secondary" whiteSpace="nowrap">
                {branch.openTime && branch.closeTime
                    ? `${branch.openTime} – ${branch.closeTime}`
                    : '—'}
            </Text>
        ),
    },
    {
        id: 'address',
        name: 'Manzil',
        template: (branch) => (
            <Text variant="body-2" color="secondary">{branch.address ?? '—'}</Text>
        ),
    },
    {
        id: 'manager',
        name: 'Menejer',
        template: (branch) => (
            <div>
                <Text as="div" variant="body-2">{branch.managerName ?? '—'}</Text>
                {branch.managerPhone && (
                    <Text as="div" variant="caption-2" color="hint">{branch.managerPhone}</Text>
                )}
            </div>
        ),
    },
    {
        id: 'actions',
        name: '',
        width: 56,
        template: (branch) => (
            <Button
                size="s"
                view="flat"
                onClick={(e) => { e.stopPropagation(); navigate(`/branch/${branch.id}/edit`, {state: {branch}}) }}
            >
                <Button.Icon><Pencil/></Button.Icon>
            </Button>
        ),
    },
]

export default function BranchPage() {
    const navigate = useNavigate()
    const {data: branches = [], isLoading} = useGetAllBranches()
    const {mutate: syncBranches, isPending: isSyncing} = useSyncBranches()
    const {setHeader} = useHeader()

    useEffect(() => {
        setHeader({title: 'Filiallar'})
    }, [])

    return (
        <div className={s.root}>
            <div>
                <Button view="outlined" size="l" loading={isSyncing} onClick={() => syncBranches()}>
                    <Button.Icon><ArrowRotateLeft/></Button.Icon>
                    Sinxronlashtirish
                </Button>
            </div>
            <Table
                width="max"
                data={branches}
                columns={COLUMNS(navigate)}
                getRowId={(b) => b.id}
                emptyMessage={isLoading ? 'Yuklanmoqda...' : 'Filiallar topilmadi'}
            />
        </div>
    )
}
