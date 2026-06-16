import {useEffect} from "react";
import {useNavigate} from "react-router";
import {Button, Label, Table, Text} from "@gravity-ui/uikit";
import {Pencil, Plus} from "@gravity-ui/icons";
import dayjs from "dayjs";
import {useGetAllBanners} from "@/services/banner/query.js";
import {useHeader} from "@/providers/header.jsx";
import {baseCdnUrl} from "@/services/config.js";
import s from "./main.module.css";

const COLUMNS = (navigate) => [
    {
        id: 'image',
        name: '',
        width: 80,
        template: (banner) => (
            <img
                className={s.thumb}
                src={`${baseCdnUrl}/banner/${banner.image}`}
                alt={banner.title}
            />
        ),
    },
    {
        id: 'title',
        name: 'Nomi',
        template: (banner) => (
            <Text variant="body-2">{banner.title}</Text>
        ),
    },
    {
        id: 'content',
        name: 'Mazmuni',
        template: (banner) => (
            <Text variant="body-2" color="secondary" ellipsis>{banner.content ?? '—'}</Text>
        ),
    },
    {
        id: 'status',
        name: 'Holat',
        width: 100,
        template: (banner) => (
            <Label theme={banner.isActive ? 'success' : 'default'} size="s">
                {banner.isActive ? 'Faol' : 'Nofaol'}
            </Label>
        ),
    },
    {
        id: 'createdAt',
        name: 'Sana',
        width: 120,
        template: (banner) => (
            <Text variant="body-2" color="hint">{dayjs(banner.createdAt).format('DD.MM.YYYY')}</Text>
        ),
    },
    {
        id: 'actions',
        name: '',
        width: 56,
        template: (banner) => (
            <Button
                size="s"
                view="flat"
                onClick={(e) => { e.stopPropagation(); navigate(`/banner/${banner.id}/edit`, {state: {banner}}) }}
            >
                <Button.Icon><Pencil/></Button.Icon>
            </Button>
        ),
    },
]

export default function BannerPage() {
    const navigate = useNavigate()
    const {data: banners = [], isLoading} = useGetAllBanners()
    const {setHeader} = useHeader()

    useEffect(() => {
        setHeader({title: 'Bannerlar'})
    }, [])

    return (
        <div className={s.root}>
            <div>
                <Button view="action" size="l" onClick={() => navigate('/banner/create')}>
                    <Button.Icon><Plus/></Button.Icon>
                    Banner qo'shish
                </Button>
            </div>
            <Table
                width="max"
                data={banners}
                columns={COLUMNS(navigate)}
                getRowId={(b) => b.id}
                emptyMessage={isLoading ? 'Yuklanmoqda...' : 'Bannerlar topilmadi'}
            />
        </div>
    )
}
