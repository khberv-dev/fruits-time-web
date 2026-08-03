import {useId, useState} from "react";
import {Card, Select, Text} from "@gravity-ui/uikit";
import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis} from "recharts";
import dayjs from "dayjs";
import {formatNumber} from "@/utils/lib.js";
import s from "./main.module.css";

const PERIOD_OPTIONS = [
    {value: '7', content: '7 kun'},
    {value: '30', content: '30 kun'},
]

// Compact by design: one series, so the title names it and no legend is needed. The
// y-axis is dropped in favour of the period total up top — magnitude is read from that
// number, exact per-day values from the hover tooltip.
export default function TrendChart({title, data = [], valueLabel = 'Soni', onPeriodChange}) {
    const [period, setPeriod] = useState('7')
    // useId's output contains colons, which are not safe inside an SVG url(#…) reference.
    const gradientId = `trend-${useId().replace(/:/g, '')}`

    const handlePeriodChange = ([v]) => {
        setPeriod(v)
        onPeriodChange?.(v)
    }

    const chartData = data.map((item) => ({
        ...item,
        label: dayjs(item.date).format('DD.MM'),
    }))

    const total = data.reduce((sum, item) => sum + (item.count ?? 0), 0)

    return (
        <Card className={s.root} view="outlined">
            <div className={s.header}>
                <div className={s.heading}>
                    <Text variant="body-2" color="secondary">{title}</Text>
                    <Text variant="header-1" className={s.total}>{formatNumber(total)}</Text>
                </div>
                <Select
                    value={[period]}
                    onUpdate={handlePeriodChange}
                    options={PERIOD_OPTIONS}
                    size="s"
                    width={104}
                />
            </div>

            <ResponsiveContainer width="100%" height={120}>
                <AreaChart data={chartData} margin={{top: 4, right: 4, left: 4, bottom: 0}}>
                    <defs>
                        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--g-color-base-brand)" stopOpacity={0.28}/>
                            <stop offset="100%" stopColor="var(--g-color-base-brand)" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="label"
                        tick={{fontSize: 11, fill: 'var(--g-color-text-hint)'}}
                        axisLine={false}
                        tickLine={false}
                        interval="preserveStartEnd"
                        minTickGap={24}
                    />
                    <Tooltip
                        cursor={{stroke: 'var(--g-color-line-generic-active)', strokeWidth: 1}}
                        contentStyle={{
                            background: 'var(--g-color-base-float)',
                            border: '1px solid var(--g-color-line-generic)',
                            borderRadius: 'var(--g-border-radius-m)',
                            fontSize: 13,
                        }}
                        labelStyle={{color: 'var(--g-color-text-primary)'}}
                        itemStyle={{color: 'var(--g-color-text-secondary)'}}
                        formatter={(value) => [formatNumber(value), valueLabel]}
                    />
                    <Area
                        type="monotone"
                        dataKey="count"
                        stroke="var(--g-color-base-brand)"
                        strokeWidth={2}
                        fill={`url(#${gradientId})`}
                        // No per-point dots: at 30 days they collide. The hover dot gets a
                        // surface-colored ring so it stays legible over the fill.
                        dot={false}
                        activeDot={{r: 4, strokeWidth: 2, stroke: 'var(--g-color-base-background)'}}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </Card>
    )
}
