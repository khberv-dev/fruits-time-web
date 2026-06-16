import {useEffect, useState} from "react";
import {Card, Text} from "@gravity-ui/uikit";
import {Person, Receipt, Rectangles4, ShoppingCart} from "@gravity-ui/icons";
import dayjs from "dayjs";
import {useGetOrdersTrend, useGetStats, useGetUsersTrend} from "@/services/stats/query.js";
import {useHeader} from "@/providers/header.jsx";
import TrendChart from "@/ui/components/trend-chart/index.jsx";
import s from "./main.module.css";

const SUMMARY_CARDS = [
    {key: 'usersCount', label: 'Foydalanuvchilar', icon: Person},
    {key: 'catalogsCount', label: 'Kataloglar', icon: Rectangles4},
    {key: 'productsCount', label: 'Mahsulotlar', icon: ShoppingCart},
    {key: 'ordersCount', label: 'Buyurtmalar', icon: Receipt},
]

function useTrendDates(period) {
    const end = dayjs().format('YYYY-MM-DD')
    const start = dayjs().subtract(Number(period) - 1, 'day').format('YYYY-MM-DD')
    return {start, end}
}

export default function MainPage() {
    const {setHeader} = useHeader()
    const {data: stats} = useGetStats()
    const [usersPeriod, setUsersPeriod] = useState('7')
    const [ordersPeriod, setOrdersPeriod] = useState('7')

    const {start: usersStart, end: usersEnd} = useTrendDates(usersPeriod)
    const {start: ordersStart, end: ordersEnd} = useTrendDates(ordersPeriod)

    const {data: usersTrend = []} = useGetUsersTrend(usersStart, usersEnd)
    const {data: ordersTrend = []} = useGetOrdersTrend(ordersStart, ordersEnd)

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
                    data={usersTrend}
                    onPeriodChange={setUsersPeriod}
                />
                <TrendChart
                    title="Buyurtmalar"
                    data={ordersTrend}
                    onPeriodChange={setOrdersPeriod}
                />
            </div>
        </div>
    )
}
