import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useGetAllCatalogs, useDeleteCatalog} from "@/services/catalog/query.js";
import {useHeader} from "@/providers/header.jsx";
import {Button} from "@gravity-ui/uikit";
import {Plus} from "@gravity-ui/icons";
import CatalogCard from "@/ui/components/catalog-card/index.jsx";
import ConfirmDialog from "@/ui/components/confirm-dialog/index.jsx";
import s from "./main.module.css";

export default function CatalogPage() {
    const navigate = useNavigate()
    const {data: catalogs = [], isLoading} = useGetAllCatalogs()
    const {mutate: deleteCatalog, isPending: isDeleting} = useDeleteCatalog()
    const {setHeader} = useHeader()

    const [deletingId, setDeletingId] = useState(null)

    useEffect(() => {
        setHeader({title: 'Kataloglar'})
    }, [])

    const handleDelete = () => {
        deleteCatalog(deletingId, {onSuccess: () => setDeletingId(null)})
    }

    if (isLoading) return null

    return (
        <div className={s.root}>
            <div>
                <Button view="action" size="l" onClick={() => navigate('/catalog/create')}>
                    <Button.Icon><Plus/></Button.Icon>
                    Katalog qo'shish
                </Button>
            </div>
            <div className={s.grid}>
                {catalogs.map((catalog) => (
                    <CatalogCard
                        key={catalog.id}
                        catalog={catalog}
                        onClick={() => navigate(`/catalog/${catalog.id}/product`, {state: {catalogTitle: catalog.title}})}
                        onEdit={() => navigate(`/catalog/${catalog.id}/edit`, {state: {catalog}})}
                        onDelete={() => setDeletingId(catalog.id)}
                    />
                ))}
            </div>

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
