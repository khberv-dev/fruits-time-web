import {useEffect, useState} from "react";
import {useNavigate, useLocation, useParams} from "react-router";
import {useForm} from "react-hook-form";
import {Button, Text, TextInput} from "@gravity-ui/uikit";
import {useUpdateCatalog, useDeleteCatalog, useGetCatalog} from "@/services/catalog/query.js";
import ConfirmDialog from "@/ui/components/confirm-dialog/index.jsx";
import {useHeader} from "@/providers/header.jsx";
import {useResourceLocale} from "@/providers/resource-locale.jsx";
import {baseCdnUrl} from "@/services/config.js";
import ImageUpload from "@/ui/components/image-upload/index.jsx";
import s from "./main.module.css";

export default function CatalogEditPage() {
    const {catalogId} = useParams()
    const {state} = useLocation()
    const navigate = useNavigate()
    const {resourceLocale} = useResourceLocale()
    const {mutate: updateCatalog, isPending} = useUpdateCatalog()
    const {mutate: deleteCatalog, isPending: isDeleting} = useDeleteCatalog()
    const [confirmOpen, setConfirmOpen] = useState(false)
    const {setHeader} = useHeader()

    const {data: catalogData} = useGetCatalog(catalogId, resourceLocale)

    const {handleSubmit, watch, setValue} = useForm({
        defaultValues: {title: state?.catalog?.title ?? '', file: null}
    })

    const [title, file] = watch(['title', 'file'])

    useEffect(() => {
        setHeader({
            title: state?.catalog?.title ?? '',
            onBack: () => navigate(-1),
        })
    }, [state?.catalog?.title])

    useEffect(() => {
        if (!catalogData) return
        setValue('title', catalogData.title ?? '', {shouldDirty: true})
        setValue('file', null, {shouldDirty: true})
    }, [catalogData])

    const onSubmit = () => {
        const fd = new FormData()
        fd.append('title', title.trim())
        if (file) fd.append('file', file)

        updateCatalog(
            {catalogId, data: fd, resource_locale: resourceLocale},
            {onSuccess: () => navigate('/catalog')}
        )
    }

    return (
        <div className={s.root}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <ImageUpload
                    value={file}
                    onUpdate={(f) => setValue('file', f)}
                    previewSrc={state?.catalog?.image ? `${baseCdnUrl}/catalog/${state.catalog.image}` : null}
                    disabled={isPending}
                />

                <div className={s.field}>
                    <Text variant="body-2">Nomi</Text>
                    <TextInput
                        value={title}
                        onUpdate={(v) => setValue('title', v)}
                        placeholder="Katalog nomi"
                        disabled={isPending}
                        size="l"
                    />
                </div>

                <div className={s.footer}>
                    <Button
                        view="outlined-danger"
                        size="l"
                        loading={isDeleting}
                        disabled={isPending}
                        onClick={() => setConfirmOpen(true)}
                    >
                        O'chirish
                    </Button>
                    <Button
                        type="submit"
                        view="action"
                        size="l"
                        loading={isPending}
                        disabled={!title.trim() || isDeleting}
                    >
                        Saqlash
                    </Button>
                </div>
            </form>

            <ConfirmDialog
                open={confirmOpen}
                title="Katalogni o'chirish"
                description="Bu amalni ortga qaytarib bo'lmaydi. Davom etasizmi?"
                loading={isDeleting}
                onConfirm={() => deleteCatalog(catalogId, {onSuccess: () => navigate('/catalog')})}
                onClose={() => setConfirmOpen(false)}
            />
        </div>
    )
}
