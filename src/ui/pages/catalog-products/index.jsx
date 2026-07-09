import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router";
import {Button, Label, Table, Text} from "@gravity-ui/uikit";
import {Pencil, Plus, TrashBin} from "@gravity-ui/icons";
import dayjs from "dayjs";
import {useDeleteProduct, useGetAllProducts} from "@/services/product/query.js";
import {useHeader} from "@/providers/header.jsx";
import {baseCdnUrl} from "@/services/config.js";
import {formatNumber} from "@/utils/lib.js";
import ConfirmDialog from "@/ui/components/confirm-dialog/index.jsx";
import s from "./main.module.css";

const TYPE_LABEL = {
    juice: 'Sharbat',
    vitamin: 'Vitamin',
}

const COLUMNS = (catalogId, navigate, setDeletingId) => [
    {
        id: 'image',
        name: '',
        width: 56,
        template: (product) => (
            <img
                className={s.thumb}
                src={`${baseCdnUrl}/product/${product.image}`}
                alt={product.title}
            />
        ),
    },
    {
        id: 'title',
        name: 'Nomi',
        template: (product) => (
            <Text variant="body-2">{product.title}</Text>
        ),
    },
    {
        id: 'type',
        name: 'Turi',
        width: 100,
        template: (product) => product.type ? (
            <Label size="s">{TYPE_LABEL[product.type] ?? product.type}</Label>
        ) : null,
    },
    {
        id: 'status',
        name: 'Holat',
        width: 100,
        template: (product) => (
            <Label theme={product.isActive ? 'success' : 'default'} size="s">
                {product.isActive ? 'Faol' : 'Nofaol'}
            </Label>
        ),
    },
    {
        id: 'price',
        name: 'Narx',
        width: 140,
        template: (product) => product.price != null ? (
            <Text variant="body-2" whiteSpace="nowrap">{formatNumber(product.price)} UZS</Text>
        ) : (
            <Text variant="body-2" color="hint">—</Text>
        ),
    },
    {
        id: 'createdAt',
        name: 'Sana',
        width: 120,
        template: (product) => (
            <Text variant="body-2" color="hint">{dayjs(product.createdAt).format('DD.MM.YYYY')}</Text>
        ),
    },
    {
        id: 'actions',
        name: '',
        width: 88,
        template: (product) => (
            <div className={s.actions}>
                <Button
                    size="s"
                    view="flat"
                    onClick={(e) => { e.stopPropagation(); navigate(`/catalog/${catalogId}/product/${product.id}/edit`, {state: {product}}) }}
                >
                    <Button.Icon><Pencil/></Button.Icon>
                </Button>
                <Button
                    size="s"
                    view="flat-danger"
                    onClick={(e) => { e.stopPropagation(); setDeletingId(product.id) }}
                >
                    <Button.Icon><TrashBin/></Button.Icon>
                </Button>
            </div>
        ),
    },
]

export default function CatalogProductsPage() {
    const {catalogId} = useParams()
    const {state} = useLocation()
    const navigate = useNavigate()
    const {data: products = [], isLoading} = useGetAllProducts(catalogId)
    const {mutate: deleteProduct, isPending: isDeleting} = useDeleteProduct()
    const {setHeader} = useHeader()

    const [deletingId, setDeletingId] = useState(null)

    useEffect(() => {
        setHeader({
            title: state?.catalogTitle ?? '',
            onBack: () => navigate('/catalog'),
        })
    }, [state?.catalogTitle])

    const handleDelete = () => {
        deleteProduct({catalogId, productId: deletingId}, {onSuccess: () => setDeletingId(null)})
    }

    return (
        <div className={s.root}>
            <div>
                <Button view="action" size="l" onClick={() => navigate(`/catalog/${catalogId}/product/create`)}>
                    <Button.Icon><Plus/></Button.Icon>
                    Mahsulot qo'shish
                </Button>
            </div>
            <div className={s.tableWrapper}>
                <Table
                    width="max"
                    data={products}
                    columns={COLUMNS(catalogId, navigate, setDeletingId)}
                    getRowId={(p) => p.id}
                    emptyMessage={isLoading ? 'Yuklanmoqda...' : 'Mahsulotlar topilmadi'}
                />
            </div>

            <ConfirmDialog
                open={!!deletingId}
                title="Mahsulotni o'chirish"
                description="Bu amalni ortga qaytarib bo'lmaydi. Davom etasizmi?"
                loading={isDeleting}
                onConfirm={handleDelete}
                onClose={() => setDeletingId(null)}
            />
        </div>
    )
}
