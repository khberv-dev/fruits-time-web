import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {Button, Label, Pagination, Table, Text} from "@gravity-ui/uikit";
import {TrashBin} from "@gravity-ui/icons";
import dayjs from "dayjs";
import {useCancelOrder, useGetAdminOrders} from "@/services/order/query.js";
import {useHeader} from "@/providers/header.jsx";
import {formatNumber, formatPhoneNumber} from "@/utils/lib.js";
import ConfirmDialog from "@/ui/components/confirm-dialog/index.jsx";
import s from "./main.module.css";

const PAGE_SIZE = 20

const STATUS_THEME = {
    created: 'info',
    done: 'success',
    cancelled: 'danger',
}

const STATUS_LABEL = {
    created: 'Yangi',
    done: 'Bajarildi',
    cancelled: 'Bekor qilindi',
}

const TYPE_LABEL = {
    pickup: 'Olib ketish',
    delivery: 'Yetkazib berish',
}

const COLUMNS = (setCancellingId) => [
    {
        id: 'date',
        name: 'Sana',
        template: (order) => (
            <Text variant="body-2" color="secondary" whiteSpace="nowrap">
                {dayjs(order.createdAt).format('DD.MM.YY HH:mm')}
            </Text>
        ),
    },
    {
        id: 'status',
        name: 'Holat',
        template: (order) => (
            <Label theme={STATUS_THEME[order.status] ?? 'default'} size="s">
                {STATUS_LABEL[order.status] ?? order.status}
            </Label>
        ),
    },
    {
        id: 'type',
        name: 'Turi',
        template: (order) => (
            <Label theme={order.type === 'delivery' ? 'info' : 'default'} size="s">
                {TYPE_LABEL[order.type] ?? order.type}
            </Label>
        ),
    },
    {
        id: 'posId',
        name: 'POS',
        template: (order) => (
            <Text variant="body-2" color="hint">{order.posId ?? '—'}</Text>
        ),
    },
    {
        id: 'user',
        name: 'Mijoz',
        template: (order) => (
            <div>
                <Text as="div" variant="body-2">{order.user?.firstName ?? '—'}</Text>
                <Text as="div" variant="caption-2" color="hint">
                    {order.user?.phoneNumber ? formatPhoneNumber(order.user.phoneNumber) : '—'}
                </Text>
            </div>
        ),
    },
    {
        id: 'items',
        name: 'Mahsulotlar',
        template: (order) => (
            <div className={s.itemsList}>
                {order.items?.map((item) => (
                    <Text key={item.id} as="div" variant="caption-2" color="secondary">
                        {item.product?.title} × {item.quantity}
                    </Text>
                ))}
            </div>
        ),
    },
    {
        id: 'total',
        name: 'Summa',
        template: (order) => {
            const itemsTotal = order.items?.reduce((sum, item) => sum + item.price, 0) ?? 0
            const total = itemsTotal + (order.deliveryCost ?? 0)
            return (
                <Text variant="body-2" whiteSpace="nowrap">
                    {formatNumber(total)} UZS
                </Text>
            )
        },
    },
    {
        id: 'actions',
        name: '',
        width: 56,
        template: (order) => (
            order.status === 'created' && (
                <Button
                    size="s"
                    view="flat-danger"
                    onClick={(e) => { e.stopPropagation(); setCancellingId(order.id) }}
                >
                    <Button.Icon><TrashBin/></Button.Icon>
                </Button>
            )
        ),
    },
]

export default function OrdersPage() {
    const {setHeader} = useHeader()
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [cancellingId, setCancellingId] = useState(null)

    const {data, isLoading} = useGetAdminOrders(page, PAGE_SIZE)
    const {mutate: cancelOrder, isPending: isCancelling} = useCancelOrder()

    useEffect(() => {
        setHeader({title: 'Buyurtmalar'})
    }, [])

    return (
        <div className={s.root}>
            <div className={s.tableWrapper}>
                <Table
                    width="max"
                    data={data?.data ?? []}
                    columns={COLUMNS(setCancellingId)}
                    getRowId={(order) => order.id}
                    onRowClick={(order) => navigate(`/orders/${order.id}`, {state: {order}})}
                    emptyMessage={isLoading ? 'Yuklanmoqda...' : 'Buyurtmalar topilmadi'}
                />
            </div>
            {data?.total > PAGE_SIZE && (
                <div className={s.pagination}>
                    <Pagination
                        page={page}
                        pageSize={PAGE_SIZE}
                        total={data.total}
                        onUpdate={(p) => setPage(p)}
                    />
                </div>
            )}

            <ConfirmDialog
                open={!!cancellingId}
                title="Buyurtmani bekor qilish"
                description="Bu amalni ortga qaytarib bo'lmaydi. Davom etasizmi?"
                confirmText="Bekor qilish"
                cancelText="Yopish"
                loading={isCancelling}
                onConfirm={() => cancelOrder(cancellingId, {onSuccess: () => setCancellingId(null)})}
                onClose={() => setCancellingId(null)}
            />
        </div>
    )
}
