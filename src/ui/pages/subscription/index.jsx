import {useEffect} from "react";
import {useNavigate} from "react-router";
import {Button, Label, Table, Text} from "@gravity-ui/uikit";
import {Pencil, Plus, Ticket} from "@gravity-ui/icons";
import dayjs from "dayjs";
import {useGetAllSubscriptions} from "@/services/subscription/query.js";
import {useHeader} from "@/providers/header.jsx";
import {useResourceLocale} from "@/providers/resource-locale.jsx";
import {pickLocale} from "@/utils/lib.js";
import s from "./main.module.css";

const COLUMNS = (navigate, locale) => [
    {
        id: 'title',
        name: 'Nomi',
        template: (subscription) => {
            const title = pickLocale(subscription.title, locale)

            return title
                ? <Text variant="body-2">{title}</Text>
                : <Text variant="body-2" color="hint">Nomi kiritilmagan</Text>
        },
    },
    {
        id: 'products',
        name: 'Mahsulotlar',
        width: 140,
        template: (subscription) => (
            <Text variant="body-2" color="secondary">
                {subscription.productIds?.length ?? 0} ta
            </Text>
        ),
    },
    {
        id: 'status',
        name: 'Holat',
        width: 100,
        template: (subscription) => (
            <Label theme={subscription.isActive ? 'success' : 'default'} size="s">
                {subscription.isActive ? 'Faol' : 'Nofaol'}
            </Label>
        ),
    },
    {
        id: 'createdAt',
        name: 'Sana',
        width: 120,
        template: (subscription) => (
            <Text variant="body-2" color="hint">{dayjs(subscription.createdAt).format('DD.MM.YYYY')}</Text>
        ),
    },
    {
        id: 'actions',
        name: '',
        width: 140,
        template: (subscription) => (
            <div className={s.actions}>
                <Button
                    size="s"
                    view="flat"
                    onClick={(e) => { e.stopPropagation(); navigate(`/subscription/${subscription.id}/codes`) }}
                >
                    <Button.Icon><Ticket/></Button.Icon>
                    Kodlar
                </Button>
                <Button
                    size="s"
                    view="flat"
                    onClick={(e) => { e.stopPropagation(); navigate(`/subscription/${subscription.id}/edit`, {state: {subscription}}) }}
                >
                    <Button.Icon><Pencil/></Button.Icon>
                </Button>
            </div>
        ),
    },
]

export default function SubscriptionPage() {
    const navigate = useNavigate()
    const {resourceLocale} = useResourceLocale()
    const {data: subscriptions = [], isLoading} = useGetAllSubscriptions()
    const {setHeader} = useHeader()

    useEffect(() => {
        setHeader({title: 'Obunalar'})
    }, [])

    return (
        <div className={s.root}>
            <div>
                <Button view="action" size="l" onClick={() => navigate('/subscription/create')}>
                    <Button.Icon><Plus/></Button.Icon>
                    Obuna qo'shish
                </Button>
            </div>
            <div className={s.tableWrapper}>
                <Table
                    width="max"
                    data={subscriptions}
                    columns={COLUMNS(navigate, resourceLocale)}
                    getRowId={(subscription) => subscription.id}
                    emptyMessage={isLoading ? 'Yuklanmoqda...' : 'Obunalar topilmadi'}
                />
            </div>
        </div>
    )
}
