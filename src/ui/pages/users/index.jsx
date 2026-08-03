import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {Table, Text} from "@gravity-ui/uikit";
import dayjs from "dayjs";
import {useGetAllUsers} from "@/services/user/query.js";
import {useHeader} from "@/providers/header.jsx";
import {formatPhoneNumber} from "@/utils/lib.js";
import ListPagination from "@/ui/components/list-pagination/index.jsx";
import s from "./main.module.css";

const GENDER_LABEL = {
    male: 'Erkak',
    female: 'Ayol',
}

const COLUMNS = [
    {
        id: 'firstName',
        name: 'Ism',
        template: (user) => (
            <Text variant="body-2">{user.firstName ?? '—'}</Text>
        ),
    },
    {
        id: 'phoneNumber',
        name: 'Telefon',
        width: 180,
        template: (user) => (
            <Text variant="body-2" whiteSpace="nowrap">
                {user.phoneNumber ? formatPhoneNumber(user.phoneNumber) : '—'}
            </Text>
        ),
    },
    {
        id: 'referralCode',
        name: 'Referral kod',
        width: 140,
        template: (user) => (
            user.referralCode
                ? <Text variant="code-1">{user.referralCode}</Text>
                : <Text variant="body-2" color="hint">—</Text>
        ),
    },
    {
        id: 'gender',
        name: 'Jinsi',
        width: 100,
        template: (user) => (
            <Text variant="body-2" color="secondary">{GENDER_LABEL[user.gender] ?? '—'}</Text>
        ),
    },
    {
        id: 'createdAt',
        name: 'Ro\'yxatdan o\'tgan',
        width: 160,
        template: (user) => (
            <Text variant="body-2" color="hint" whiteSpace="nowrap">
                {dayjs(user.createdAt).format('DD.MM.YYYY HH:mm')}
            </Text>
        ),
    },
]

export default function UsersPage() {
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(20)
    const {data, isLoading} = useGetAllUsers({page, pageSize})
    const {setHeader} = useHeader()

    // This endpoint answers with {users, total, pages}, unlike the {data, total} envelope
    // the order endpoints use.
    const {users = [], total = 0} = data ?? {}

    useEffect(() => {
        setHeader({title: 'Foydalanuvchilar'})
    }, [])

    return (
        <div className={s.root}>
            <div className={s.tableWrapper}>
                <Table
                    width="max"
                    data={users}
                    columns={COLUMNS}
                    getRowId={(user) => user.id}
                    onRowClick={(user) => navigate(`/users/${user.id}`)}
                    emptyMessage={isLoading ? 'Yuklanmoqda...' : 'Foydalanuvchilar topilmadi'}
                />
            </div>

            <ListPagination
                page={page}
                pageSize={pageSize}
                total={total}
                onUpdate={(nextPage, nextPageSize) => { setPage(nextPage); setPageSize(nextPageSize) }}
            />
        </div>
    )
}
