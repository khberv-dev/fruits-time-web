import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {Button, Label, SegmentedRadioGroup, Table, Text} from "@gravity-ui/uikit";
import {ArrowRotateLeft, Check} from "@gravity-ui/icons";
import dayjs from "dayjs";
import {useGetSubscriptionRequests, useUpdateSubscriptionRequestStatus} from "@/services/subscription/query.js";
import {useHeader} from "@/providers/header.jsx";
import {formatPhoneNumber} from "@/utils/lib.js";
import ListPagination from "@/ui/components/list-pagination/index.jsx";
import s from "./main.module.css";

const STATUS_FILTERS = [
    {value: 'new', content: 'Yangi'},
    {value: 'accepted', content: "Bog'lanilgan"},
    {value: 'all', content: 'Barchasi'},
]

const STATUS_LABEL = {
    new: 'Yangi',
    accepted: "Bog'lanilgan",
}

const COLUMNS = (navigate, updateStatus, isPending) => [
    {
        id: 'user',
        name: 'Mijoz',
        template: (request) => (
            <div
                className={request.user?.id ? s.userLink : undefined}
                onClick={request.user?.id ? () => navigate(`/users/${request.user.id}`) : undefined}
            >
                <Text as="div" variant="body-2" color={request.user?.id ? 'info' : undefined}>
                    {request.user?.firstName ?? '—'}
                </Text>
            </div>
        ),
    },
    {
        id: 'phone',
        name: 'Telefon',
        width: 200,
        // The phone number is the point of this list, so it dials straight from the row.
        template: (request) => (
            request.user?.phoneNumber ? (
                <a className={s.phone} href={`tel:+${request.user.phoneNumber}`}>
                    <Text variant="body-2" color="info" whiteSpace="nowrap">
                        {formatPhoneNumber(request.user.phoneNumber)}
                    </Text>
                </a>
            ) : (
                <Text variant="body-2" color="hint">—</Text>
            )
        ),
    },
    {
        id: 'status',
        name: 'Holat',
        width: 140,
        template: (request) => (
            <Label theme={request.status === 'accepted' ? 'success' : 'info'} size="s">
                {STATUS_LABEL[request.status] ?? request.status}
            </Label>
        ),
    },
    {
        id: 'createdAt',
        name: "So'ralgan sana",
        width: 160,
        template: (request) => (
            <Text variant="body-2" color="hint" whiteSpace="nowrap">
                {dayjs(request.createdAt).format('DD.MM.YYYY HH:mm')}
            </Text>
        ),
    },
    {
        id: 'updatedAt',
        name: 'Yangilangan',
        width: 160,
        template: (request) => (
            <Text variant="body-2" color="hint" whiteSpace="nowrap">
                {dayjs(request.updatedAt).format('DD.MM.YYYY HH:mm')}
            </Text>
        ),
    },
    {
        id: 'actions',
        name: '',
        width: 170,
        template: (request) => (
            request.status === 'new' ? (
                <Button
                    size="s"
                    view="outlined-success"
                    disabled={isPending}
                    onClick={() => updateStatus({requestId: request.id, status: 'accepted'})}
                >
                    <Button.Icon><Check/></Button.Icon>
                    Bog'lanildi
                </Button>
            ) : (
                <Button
                    size="s"
                    view="flat"
                    disabled={isPending}
                    onClick={() => updateStatus({requestId: request.id, status: 'new'})}
                >
                    <Button.Icon><ArrowRotateLeft/></Button.Icon>
                    Qaytarish
                </Button>
            )
        ),
    },
]

export default function SubscriptionRequestsPage() {
    const navigate = useNavigate()
    const [status, setStatus] = useState('new')
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(20)
    const {data, isLoading} = useGetSubscriptionRequests({
        page,
        pageSize,
        // 'all' is a UI-only value: the endpoint lists every request when status is omitted.
        status: status === 'all' ? undefined : status,
    })
    const {mutate: updateStatus, isPending} = useUpdateSubscriptionRequestStatus()
    const {setHeader} = useHeader()

    useEffect(() => {
        setHeader({title: "Obuna so'rovlari"})
    }, [])

    const handleStatusChange = (value) => {
        setStatus(value)
        setPage(1)
    }

    return (
        <div className={s.root}>
            <div className={s.toolbar}>
                <SegmentedRadioGroup
                    value={status}
                    onUpdate={handleStatusChange}
                    options={STATUS_FILTERS}
                    size="l"
                />
                <Text variant="body-2" color="hint">
                    Qabul qilish faqat belgi — obuna berish uchun kod yaratib berish kerak
                </Text>
            </div>

            <div className={s.tableWrapper}>
                <Table
                    width="max"
                    data={data?.data ?? []}
                    columns={COLUMNS(navigate, updateStatus, isPending)}
                    getRowId={(request) => request.id}
                    emptyMessage={isLoading ? 'Yuklanmoqda...' : "So'rovlar topilmadi"}
                />
            </div>

            <ListPagination
                page={page}
                pageSize={pageSize}
                total={data?.total ?? 0}
                onUpdate={(nextPage, nextPageSize) => { setPage(nextPage); setPageSize(nextPageSize) }}
            />
        </div>
    )
}
