import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {Card, Label, Table, Text} from "@gravity-ui/uikit";
import dayjs from "dayjs";
import {useGetUser, useGetUserOrders} from "@/services/user/query.js";
import {useHeader} from "@/providers/header.jsx";
import {formatNumber, formatPhoneNumber} from "@/utils/lib.js";
import ListPagination from "@/ui/components/list-pagination/index.jsx";
import s from "./main.module.css";

const STATUS_THEME = {
    created: 'info',
    accepted: 'utility',
    done: 'success',
    cancelled: 'danger',
}

const STATUS_LABEL = {
    created: 'Yangi',
    accepted: 'Qabul qilindi',
    done: 'Bajarildi',
    cancelled: 'Bekor qilindi',
}

const TYPE_LABEL = {
    pickup: 'Olib ketish',
    delivery: 'Yetkazib berish',
}

const GENDER_LABEL = {
    male: 'Erkak',
    female: 'Ayol',
}

const TIER_THEME = {
    silver: 'normal',
    gold: 'warning',
    vip: 'utility',
    premium: 'success',
}

const TIER_LABEL = {
    silver: 'Kumush',
    gold: 'Oltin',
    vip: 'VIP',
    premium: 'Premium',
}

const ORDER_COLUMNS = [
    {
        id: 'date',
        name: 'Sana',
        width: 140,
        template: (order) => (
            <Text variant="body-2" color="secondary" whiteSpace="nowrap">
                {dayjs(order.createdAt).format('DD.MM.YY HH:mm')}
            </Text>
        ),
    },
    {
        id: 'status',
        name: 'Holat',
        width: 140,
        template: (order) => (
            <Label theme={STATUS_THEME[order.status] ?? 'default'} size="s">
                {STATUS_LABEL[order.status] ?? order.status}
            </Label>
        ),
    },
    {
        id: 'type',
        name: 'Turi',
        width: 140,
        template: (order) => (
            <Label theme={order.type === 'delivery' ? 'info' : 'default'} size="s">
                {TYPE_LABEL[order.type] ?? order.type}
            </Label>
        ),
    },
    {
        id: 'branch',
        name: 'Filial',
        template: (order) => (
            order.branch
                ? <Text variant="body-2">{order.branch.name}</Text>
                : <Text variant="body-2" color="hint">—</Text>
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
        width: 140,
        template: (order) => {
            const itemsTotal = order.items?.reduce((sum, item) => sum + item.price, 0) ?? 0

            return (
                <Text variant="body-2" whiteSpace="nowrap">
                    {formatNumber(itemsTotal + (order.deliveryCost ?? 0))} UZS
                </Text>
            )
        },
    },
]

export default function UserDetailPage() {
    const {userId} = useParams()
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(20)
    const {data: user} = useGetUser(userId)
    const {data: orders, isLoading: isOrdersLoading} = useGetUserOrders(userId, {page, pageSize})
    const {setHeader} = useHeader()

    useEffect(() => {
        setHeader({
            title: user?.firstName ?? 'Foydalanuvchi',
            onBack: () => navigate('/users'),
        })
    }, [user?.firstName])

    const infoRows = [
        {label: 'Telefon', value: user?.phoneNumber ? formatPhoneNumber(user.phoneNumber) : '—'},
        {label: 'Referral kod', value: user?.referralCode ?? '—'},
        {label: 'Takliflar', value: user?.referralCount ?? 0},
        {label: 'Jinsi', value: GENDER_LABEL[user?.gender] ?? '—'},
        {label: "Tug'ilgan kun", value: user?.birthday ? dayjs(user.birthday).format('DD.MM.YYYY') : '—'},
        {label: "Bo'y / vazn", value: user?.height || user?.weight ? `${user?.height ?? '—'} sm / ${user?.weight ?? '—'} kg` : '—'},
        {label: "Ro'yxatdan o'tgan", value: user?.createdAt ? dayjs(user.createdAt).format('DD.MM.YYYY HH:mm') : '—'},
    ]

    return (
        <div className={s.root}>
            <Card className={s.card} view="outlined">
                <div className={s.cardHeader}>
                    <Text variant="subheader-2">Profil</Text>
                    {user?.status && (
                        <div className={s.tier}>
                            <Label theme={TIER_THEME[user.status] ?? 'normal'}>
                                {TIER_LABEL[user.status] ?? user.status}
                            </Label>
                            <Text variant="body-2" color="secondary">{user.discountPercent ?? 0}% chegirma</Text>
                        </div>
                    )}
                </div>
                <div className={s.infoGrid}>
                    {infoRows.map(({label, value}) => (
                        <div key={label} className={s.infoRow}>
                            <Text variant="body-2" color="secondary">{label}</Text>
                            <Text variant="body-2">{value}</Text>
                        </div>
                    ))}
                </div>
            </Card>

            <div className={s.ordersHeader}>
                <Text variant="subheader-2">Buyurtmalar</Text>
                <Text variant="body-2" color="hint">{orders?.total ?? 0} ta</Text>
            </div>

            <div className={s.tableWrapper}>
                <Table
                    width="max"
                    data={orders?.data ?? []}
                    columns={ORDER_COLUMNS}
                    getRowId={(order) => order.id}
                    // This endpoint omits the user on each order (they're all this one), so
                    // it's attached here for the detail page's customer card.
                    onRowClick={(order) => navigate(`/orders/${order.id}`, {state: {order: {...order, user}}})}
                    emptyMessage={isOrdersLoading ? 'Yuklanmoqda...' : 'Buyurtmalar topilmadi'}
                />
            </div>

            <ListPagination
                page={page}
                pageSize={pageSize}
                total={orders?.total ?? 0}
                onUpdate={(nextPage, nextPageSize) => { setPage(nextPage); setPageSize(nextPageSize) }}
            />
        </div>
    )
}
