import {useState} from "react";
import {Card, Select, Text} from "@gravity-ui/uikit";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import dayjs from "dayjs";
import s from "./main.module.css";

const PERIOD_OPTIONS = [
    {value: '7', content: 'Oxirgi 7 kun'},
    {value: '30', content: 'Oxirgi 30 kun'},
]

export default function TrendChart({title, data = [], onPeriodChange}) {
    const [period, setPeriod] = useState('7')

    const handlePeriodChange = ([v]) => {
        setPeriod(v)
        onPeriodChange?.(v)
    }

    const chartData = data.map((item) => ({
        ...item,
        date: dayjs(item.date).format('DD.MM'),
    }))

    return (
        <Card className={s.root} view="outlined">
            <div className={s.header}>
                <Text variant="subheader-2">{title}</Text>
                <Select
                    value={[period]}
                    onUpdate={handlePeriodChange}
                    options={PERIOD_OPTIONS}
                    size="m"
                />
            </div>
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
                        itemStyle={{color: 'var(--g-color-base-brand)'}}
                    />
                    <Line
                        type="monotone"
                        dataKey="count"
                        stroke="var(--g-color-base-brand)"
                        strokeWidth={2}
                        dot={{r: 3, fill: 'var(--g-color-base-brand)'}}
                        activeDot={{r: 5}}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Card>
    )
}
