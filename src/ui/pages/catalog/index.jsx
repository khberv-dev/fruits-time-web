import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {Button, Label, Table, Text} from "@gravity-ui/uikit";
import {Pencil, Plus, TrashBin} from "@gravity-ui/icons";
import dayjs from "dayjs";
import {useDeleteCatalog, useGetAllCatalogs} from "@/services/catalog/query.js";
import {useHeader} from "@/providers/header.jsx";
import {baseCdnUrl} from "@/services/config.js";
import ConfirmDialog from "@/ui/components/confirm-dialog/index.jsx";
import SearchInput from "@/ui/components/search-input/index.jsx";
import ListPagination from "@/ui/components/list-pagination/index.jsx";
import s from "./main.module.css";

const TYPE_LABELS = {
    juice: 'Sharbat',
    vitamin: 'Vitamin',
}

const COLUMNS = (navigate, setDeletingId) => [
    {
        id: 'image',
        name: '',
        width: 56,
        template: (catalog) => (
            <img
                className={s.thumb}
                src={`${baseCdnUrl}/catalog/${catalog.image}`}
                alt={catalog.title}
            />
        ),
    },
    {
        id: 'title',
        name: 'Nomi',
        template: (catalog) => (
            <Text variant="body-2">{catalog.title}</Text>
        ),
    },
    {
        id: 'type',
        name: 'Turi',
        width: 100,
        template: (catalog) => (
            <Text variant="body-2" color="secondary">{TYPE_LABELS[catalog.type] ?? catalog.type}</Text>
        ),
    },
    {
        id: 'status',
        name: 'Holat',
        width: 100,
        template: (catalog) => (
            <Label theme={catalog.isActive ? 'success' : 'default'} size="s">
                {catalog.isActive ? 'Faol' : 'Nofaol'}
            </Label>
        ),
    },
    {
        id: 'productsCount',
        name: 'Mahsulotlar',
        width: 120,
        template: (catalog) => (
            <Text variant="body-2" color="secondary">{catalog.productsCount} ta</Text>
        ),
    },
    {
        id: 'createdAt',
        name: 'Sana',
        width: 120,
        template: (catalog) => (
            <Text variant="body-2" color="hint">{dayjs(catalog.createdAt).format('DD.MM.YYYY')}</Text>
        ),
    },
    {
        id: 'actions',
        name: '',
        width: 88,
        template: (catalog) => (
            <div className={s.actions}>
                <Button
                    size="s"
                    view="flat"
                    onClick={(e) => { e.stopPropagation(); navigate(`/catalog/${catalog.id}/edit`, {state: {catalog}}) }}
                >
                    <Button.Icon><Pencil/></Button.Icon>
                </Button>
                <Button
                    size="s"
                    view="flat-danger"
                    onClick={(e) => { e.stopPropagation(); setDeletingId(catalog.id) }}
                >
                    <Button.Icon><TrashBin/></Button.Icon>
                </Button>
            </div>
        ),
    },
]

export default function CatalogPage() {
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(20)
    const [search, setSearch] = useState('')
    const {data, isLoading} = useGetAllCatalogs({page, pageSize, search: search || undefined})
    const {catalogs = [], total = 0} = data ?? {}
    const {mutate: deleteCatalog, isPending: isDeleting} = useDeleteCatalog()
    const {setHeader} = useHeader()

    const [deletingId, setDeletingId] = useState(null)

    useEffect(() => {
        setHeader({title: 'Kataloglar'})
    }, [])

    const handleSearch = (value) => {
        setSearch(value)
        setPage(1)
    }

    const handleDelete = () => {
        deleteCatalog(deletingId, {onSuccess: () => setDeletingId(null)})
    }

    return (
        <div className={s.root}>
            <div className={s.toolbar}>
                <Button view="action" size="l" onClick={() => navigate('/catalog/create')}>
                    <Button.Icon><Plus/></Button.Icon>
                    Katalog qo'shish
                </Button>
                <SearchInput value={search} onUpdate={handleSearch} placeholder="Katalog qidirish..."/>
            </div>
            <div className={s.tableWrapper}>
                <Table
                    width="max"
                    data={catalogs}
                    columns={COLUMNS(navigate, setDeletingId)}
                    getRowId={(c) => c.id}
                    onRowClick={(c) => navigate(`/catalog/${c.id}/product`, {state: {catalogTitle: c.title}})}
                    emptyMessage={isLoading ? 'Yuklanmoqda...' : 'Kataloglar topilmadi'}
                />
            </div>

            <ListPagination
                page={page}
                pageSize={pageSize}
                total={total}
                onUpdate={(nextPage, nextPageSize) => { setPage(nextPage); setPageSize(nextPageSize) }}
            />

            <ConfirmDialog
                open={!!deletingId}
                title="Katalogni o'chirish"
                description="Bu amalni ortga qaytarib bo'lmaydi. Davom etasizmi?"
                loading={isDeleting}
                onConfirm={handleDelete}
                onClose={() => setDeletingId(null)}
            />
        </div>
    )
}
