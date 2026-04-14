import {useEffect, useState} from "react";
import {Card, Select, Text} from "@gravity-ui/uikit";
import {Person, LayoutCells, ShoppingCart, Receipt} from "@gravity-ui/icons";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";
import dayjs from "dayjs";
import {useGetStats, useGetUsersTrend, useGetOrdersTrend} from "@/services/stats/query.js";
import {useHeader} from "@/providers/header.jsx";
import s from "./main.module.css";

const SUMMARY_CARDS = [
    {key: 'usersCount', label: 'Foydalanuvchilar', icon: Person},
    {key: 'catalogsCount', label: 'Kataloglar', icon: LayoutCells},
    {key: 'productsCount', label: 'Mahsulotlar', icon: ShoppingCart},
    {key: 'ordersCount', label: 'Buyurtmalar', icon: Receipt},
]

const PERIOD_OPTIONS = [
    {value: '7', content: 'Oxirgi 7 kun'},
    {value: '30', content: 'Oxirgi 30 kun'},
]

function TrendChart({title, data, color}) {
    const chartData = data.map((item) => ({
        ...item,
        date: dayjs(item.date).format('DD.MM'),
    }))

    return (
        <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} margin={{top: 8, right: 16, left: 0, bottom: 0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--g-color-line-generic)"/>
                <XAxis
                    dataKey="date"
                    tick={{fontSize: 12, fill: 'var(--g-color-text-secondary)'}}
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis
                    allowDecimals={false}
                    tick={{fontSize: 12, fill: 'var(--g-color-text-secondary)'}}
                    axisLine={false}
                    tickLine={false}
                    width={32}
                />
                <Tooltip
                    contentStyle={{
                        background: 'var(--g-color-base-float)',
                        border: '1px solid var(--g-color-line-generic)',
                        borderRadius: 'var(--g-border-radius-m)',
                        fontSize: 13,
                    }}
                    labelStyle={{color: 'var(--g-color-text-primary)'}}
                    itemStyle={{color}}
                />
                <Line
                    type="monotone"
                    dataKey="count"
                    stroke={color}
                    strokeWidth={2}
                    dot={{r: 3, fill: color}}
                    activeDot={{r: 5}}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default function MainPage() {
    const {setHeader} = useHeader()
    const {data: stats} = useGetStats()
    const [usersPeriod, setUsersPeriod] = useState('7')
    const [ordersPeriod, setOrdersPeriod] = useState('7')

    const usersEnd = dayjs().format('YYYY-MM-DD')
    const usersStart = dayjs().subtract(Number(usersPeriod) - 1, 'day').format('YYYY-MM-DD')

    const ordersEnd = dayjs().format('YYYY-MM-DD')
    const ordersStart = dayjs().subtract(Number(ordersPeriod) - 1, 'day').format('YYYY-MM-DD')

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
                <Card className={s.chart} view="outlined">
                    <div className={s.chartHeader}>
                        <Text variant="subheader-2">Yangi foydalanuvchilar</Text>
                        <Select
                            value={[usersPeriod]}
                            onUpdate={([v]) => setUsersPeriod(v)}
                            options={PERIOD_OPTIONS}
                            size="m"
                        />
                    </div>
                    <TrendChart data={usersTrend} color="var(--g-color-base-brand)"/>
                </Card>

                <Card className={s.chart} view="outlined">
                    <div className={s.chartHeader}>
                        <Text variant="subheader-2">Buyurtmalar</Text>
                        <Select
                            value={[ordersPeriod]}
                            onUpdate={([v]) => setOrdersPeriod(v)}
                            options={PERIOD_OPTIONS}
                            size="m"
                        />
                    </div>
                    <TrendChart data={ordersTrend} color="var(--g-color-base-brand)"/>
                </Card>
            </div>
        </div>
    )
}
