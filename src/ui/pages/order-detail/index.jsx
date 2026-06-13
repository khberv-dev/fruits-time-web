import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router";
import {Card, Label, Text} from "@gravity-ui/uikit";
import dayjs from "dayjs";
import {useHeader} from "@/providers/header.jsx";
import {formatNumber, formatPhoneNumber} from "@/utils/lib.js";
import {baseCdnUrl} from "@/services/config.js";
import s from "./main.module.css";

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

export default function OrderDetailPage() {
    const {state} = useLocation()
    const navigate = useNavigate()
    const {setHeader} = useHeader()
    const order = state?.order

    useEffect(() => {
        setHeader({
            title: `Buyurtma #${order?.posId ?? '—'}`,
            onBack: () => navigate('/orders'),
        })
    }, [order?.posId])

    if (!order) return null

    const itemsTotal = order.items?.reduce((sum, item) => sum + item.price, 0) ?? 0
    const total = itemsTotal + (order.deliveryCost ?? 0)

    return (
        <div className={s.root}>
            <div className={s.meta}>
                <div className={s.labels}>
                    <Label theme={STATUS_THEME[order.status] ?? 'default'}>
                        {STATUS_LABEL[order.status] ?? order.status}
                    </Label>
                    <Label theme={order.type === 'delivery' ? 'info' : 'default'}>
                        {TYPE_LABEL[order.type] ?? order.type}
                    </Label>
                    {order.posId && (
                        <Label theme="normal">POS #{order.posId}</Label>
                    )}
                </div>
                <div style={{textAlign: 'right'}}>
                    <Text as="div" variant="body-2" color="hint">
                        {dayjs(order.createdAt).format('DD.MM.YYYY HH:mm')}
                    </Text>
                    <Text as="div" variant="caption-2" color="hint">{order.id}</Text>
                </div>
            </div>

            <div className={s.columns}>
                <Card className={s.card} view="outlined">
                    <Text variant="subheader-2">Mijoz</Text>
                    <div className={s.infoRows}>
                        <div className={s.infoRow}>
                            <Text variant="body-2" color="secondary">Ism</Text>
                            <Text variant="body-2">{order.user?.firstName ?? '—'}</Text>
                        </div>
                        <div className={s.infoRow}>
                            <Text variant="body-2" color="secondary">Telefon</Text>
                            <Text variant="body-2">
                                {order.user?.phoneNumber ? formatPhoneNumber(order.user.phoneNumber) : '—'}
                            </Text>
                        </div>
                    </div>
                </Card>

                {order.type === 'delivery' && (
                    <Card className={s.card} view="outlined">
                        <Text variant="subheader-2">Yetkazib berish</Text>
                        <div className={s.infoRows}>
                            {order.deliveryCost != null && (
                                <div className={s.infoRow}>
                                    <Text variant="body-2" color="secondary">Narx</Text>
                                    <Text variant="body-2">{formatNumber(order.deliveryCost)} UZS</Text>
                                </div>
                            )}
                            {order.address && (
                                <div className={s.infoRow}>
                                    <Text variant="body-2" color="secondary">Koordinatalar</Text>
                                    <Text variant="body-2">{order.address.lat}, {order.address.long}</Text>
                                </div>
                            )}
                            {order.link && (
                                <div className={s.infoRow}>
                                    <Text variant="body-2" color="secondary">Kuzatuv</Text>
                                    <a href={order.link} target="_blank" rel="noreferrer" className={s.link}>
                                        <Text variant="body-2" color="info">Havolani ochish</Text>
                                    </a>
                                </div>
                            )}
                        </div>
                    </Card>
                )}
            </div>

            <Card view="outlined">
                <div className={s.itemsHeader}>
                    <Text variant="subheader-2">Mahsulotlar</Text>
                </div>
                <div className={s.itemsTable}>
                    <div className={s.itemsTableHead}>
                        <Text variant="caption-2" color="hint">Mahsulot</Text>
                        <Text variant="caption-2" color="hint" className={s.colCenter}>Miqdor</Text>
                        <Text variant="caption-2" color="hint" className={s.colRight}>Narx</Text>
                        <Text variant="caption-2" color="hint" className={s.colRight}>Jami</Text>
                    </div>
                    {order.items?.map((item) => {
                        const hasDiscount = item.actualPrice !== item.price
                        return (
                            <div key={item.id} className={s.itemRow}>
                                <div className={s.itemProduct}>
                                    {item.product?.image && (
                                        <img
                                            className={s.itemImage}
                                            src={`${baseCdnUrl}/product/${item.product.image}`}
                                            alt={item.product.title}
                                        />
                                    )}
                                    <Text variant="body-2">{item.product?.title ?? '—'}</Text>
                                </div>
                                <Text variant="body-2" className={s.colCenter}>× {item.quantity}</Text>
                                <div className={s.colRight}>
                                    {hasDiscount ? (
                                        <>
                                            <Text as="div" variant="body-2">
                                                {formatNumber(Math.round(item.price / item.quantity))} UZS
                                            </Text>
                                            <Text as="div" variant="caption-2" color="hint" className={s.strikethrough}>
                                                {formatNumber(Math.round(item.actualPrice / item.quantity))} UZS
                                            </Text>
                                        </>
                                    ) : (
                                        <Text variant="body-2">
                                            {formatNumber(Math.round(item.actualPrice / item.quantity))} UZS
                                        </Text>
                                    )}
                                </div>
                                <Text variant="body-2" className={s.colRight}>
                                    {formatNumber(item.price)} UZS
                                </Text>
                            </div>
                        )
                    })}
                </div>

                <div className={s.summary}>
                    <div className={s.summaryRow}>
                        <Text variant="body-2" color="secondary">Mahsulotlar jami</Text>
                        <Text variant="body-2">{formatNumber(itemsTotal)} UZS</Text>
                    </div>
                    {order.deliveryCost != null && order.type === 'delivery' && (
                        <div className={s.summaryRow}>
                            <Text variant="body-2" color="secondary">Yetkazib berish</Text>
                            <Text variant="body-2">{formatNumber(order.deliveryCost)} UZS</Text>
                        </div>
                    )}
                    <div className={s.summaryRow}>
                        <Text variant="subheader-2">Umumiy</Text>
                        <Text variant="subheader-2">{formatNumber(total)} UZS</Text>
                    </div>
                </div>
            </Card>
        </div>
    )
}
