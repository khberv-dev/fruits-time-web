import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {Card, Label, Text} from "@gravity-ui/uikit";
import {Person, Receipt, Rectangles4, ShoppingCart} from "@gravity-ui/icons";
import dayjs from "dayjs";
import {useGetOrdersTrend, useGetRecentActivity, useGetStats, useGetUsersTrend} from "@/services/stats/query.js";
import {useHeader} from "@/providers/header.jsx";
import {formatNumber, formatPhoneNumber} from "@/utils/lib.js";
import TrendChart from "@/ui/components/trend-chart/index.jsx";
import ActivityCard, {ActivityRow} from "@/ui/components/activity-card/index.jsx";
import s from "./main.module.css";

const SUMMARY_CARDS = [
    {key: 'usersCount', label: 'Foydalanuvchilar', icon: Person},
    {key: 'catalogsCount', label: 'Kataloglar', icon: Rectangles4},
    {key: 'productsCount', label: 'Mahsulotlar', icon: ShoppingCart},
    {key: 'ordersCount', label: 'Buyurtmalar', icon: Receipt},
]

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

function useTrendDates(period) {
    const end = dayjs().format('YYYY-MM-DD')
    const start = dayjs().subtract(Number(period) - 1, 'day').format('YYYY-MM-DD')
    return {start, end}
}

export default function MainPage() {
    const {setHeader} = useHeader()
    const navigate = useNavigate()
    const {data: stats} = useGetStats()
    const [usersPeriod, setUsersPeriod] = useState('7')
    const [ordersPeriod, setOrdersPeriod] = useState('7')

    const {start: usersStart, end: usersEnd} = useTrendDates(usersPeriod)
    const {start: ordersStart, end: ordersEnd} = useTrendDates(ordersPeriod)

    const {data: usersTrend = []} = useGetUsersTrend(usersStart, usersEnd)
    const {data: ordersTrend = []} = useGetOrdersTrend(ordersStart, ordersEnd)
    const {data: recent, isLoading: isRecentLoading} = useGetRecentActivity()

    useEffect(() => {
        setHeader({title: 'Asosiy'})
    }, [])

    return (
        <div className={s.root}>
            <div className={s.grid}>
                {SUMMARY_CARDS.map(({key, label, icon: Icon}) => (
                    <Card key={key} className={s.card} view="outlined">
                        <div className={s.cardIcon}>
                            <Icon width={24} height={24}/>
                        </div>
                        <Text variant="display-2" className={s.cardValue}>
                            {stats?.[key] ?? '—'}
                        </Text>
                        <Text variant="body-2" color="secondary">{label}</Text>
                    </Card>
                ))}
            </div>

            <div className={s.charts}>
                <TrendChart
                    title="Yangi foydalanuvchilar"
                    valueLabel="Foydalanuvchi"
                    data={usersTrend}
                    onPeriodChange={setUsersPeriod}
                />
                <TrendChart
                    title="Buyurtmalar"
                    valueLabel="Buyurtma"
                    data={ordersTrend}
                    onPeriodChange={setOrdersPeriod}
                />
            </div>

            <div className={s.activity}>
                <ActivityCard
                    title="Yangi foydalanuvchilar"
                    onSeeAll={() => navigate('/users')}
                    isLoading={isRecentLoading}
                    isEmpty={!recent?.users?.length}
                    emptyMessage="Foydalanuvchilar yo'q"
                >
                    {recent?.users?.map((user) => (
                        <ActivityRow key={user.id} onClick={() => navigate(`/users/${user.id}`)}>
                            <div className={s.rowMain}>
                                <Text as="div" variant="body-2" ellipsis>{user.firstName ?? '—'}</Text>
                                <Text as="div" variant="caption-2" color="hint">
                                    {user.phoneNumber ? formatPhoneNumber(user.phoneNumber) : '—'}
                                </Text>
                            </div>
                            <Text variant="caption-2" color="hint" whiteSpace="nowrap">
                                {dayjs(user.createdAt).format('DD.MM HH:mm')}
                            </Text>
                        </ActivityRow>
                    ))}
                </ActivityCard>

                <ActivityCard
                    title="Oxirgi buyurtmalar"
                    onSeeAll={() => navigate('/orders')}
                    isLoading={isRecentLoading}
                    isEmpty={!recent?.orders?.length}
                    emptyMessage="Buyurtmalar yo'q"
                >
                    {recent?.orders?.map((order) => (
                        // The feed carries a trimmed order without items, so the row opens the
                        // customer — their page lists the same order in full.
                        <ActivityRow
                            key={order.id}
                            onClick={order.user ? () => navigate(`/users/${order.user.id}`) : undefined}
                        >
                            <div className={s.rowMain}>
                                <div className={s.rowTitle}>
                                    <Text variant="body-2" ellipsis>{order.user?.firstName ?? '—'}</Text>
                                    <Label theme={STATUS_THEME[order.status] ?? 'default'} size="xs">
                                        {STATUS_LABEL[order.status] ?? order.status}
                                    </Label>
                                </div>
                                <Text as="div" variant="caption-2" color="hint" ellipsis>
                                    {order.posId ? `#${order.posId}` : '—'} · {order.branch?.name ?? 'Filial yo\'q'}
                                </Text>
                            </div>
                            <div className={s.rowSide}>
                                <Text as="div" variant="body-2" whiteSpace="nowrap">
                                    {formatNumber(order.total ?? 0)} UZS
                                </Text>
                                <Text as="div" variant="caption-2" color="hint" whiteSpace="nowrap">
                                    {dayjs(order.createdAt).format('DD.MM HH:mm')}
                                </Text>
                            </div>
                        </ActivityRow>
                    ))}
                </ActivityCard>

                <ActivityCard
                    title="Faollashtirilgan obunalar"
                    onSeeAll={() => navigate('/subscription')}
                    isLoading={isRecentLoading}
                    isEmpty={!recent?.subscriptions?.length}
                    emptyMessage="Obunalar faollashtirilmagan"
                >
                    {recent?.subscriptions?.map((entry) => (
                        <ActivityRow
                            key={entry.codeId}
                            onClick={entry.user ? () => navigate(`/users/${entry.user.id}`) : undefined}
                        >
                            <div className={s.rowMain}>
                                <Text as="div" variant="body-2" ellipsis>{entry.subscription?.title ?? '—'}</Text>
                                <Text as="div" variant="caption-2" color="hint" ellipsis>
                                    {entry.user?.firstName ?? '—'}
                                    {entry.user?.phoneNumber ? ` · ${formatPhoneNumber(entry.user.phoneNumber)}` : ''}
                                </Text>
                            </div>
                            <Text variant="caption-2" color="hint" whiteSpace="nowrap">
                                {entry.redeemedAt ? dayjs(entry.redeemedAt).format('DD.MM HH:mm') : '—'}
                            </Text>
                        </ActivityRow>
                    ))}
                </ActivityCard>
            </div>
        </div>
    )
}
